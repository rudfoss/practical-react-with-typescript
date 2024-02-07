import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Patch,
	Post,
	Req,
	UseGuards
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDatabaseApiRequestAuthenticated as UserDatabaseApiRequestAuthenticated } from "../RequestReply"
import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { AuthService } from "../auth/AuthService"
import {
	HttpBadRequestException,
	HttpConflictException,
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { Group, NewGroup, PatchGroup, UserDatabaseRole } from "../models"

@Controller("groups")
@ApiTags("Groups")
@UseGuards(AuthGuard)
@ApiBearerAuth(bearerAuthName)
@ApiForbiddenResponse({ type: HttpForbiddenException })
@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
export class GroupsController {
	public constructor(@Inject(AuthService) protected authService: AuthService) {}

	@Get()
	@RequireRoles([UserDatabaseRole.UserAdmin, UserDatabaseRole.User])
	@ApiOperation({
		summary: "List all groups"
	})
	@ApiOkResponse({ type: Group, isArray: true })
	public async getGroups() {
		return await this.authService.getGroups()
	}

	@Get(":groupId")
	@ApiOperation({
		description: "Guests are only allowed to get information about groups they are a member of.",
		summary: "Get information about a specific group."
	})
	public async getGroup(
		@Param("groupId") groupId: string,
		@Req() request: UserDatabaseApiRequestAuthenticated
	) {
		if (request.userInformation.roles.includes(UserDatabaseRole.Guest)) {
			return request.userInformation.groups.find((group) => group.id === groupId)
		}
		const allGroups = await this.authService.getGroups()
		return allGroups.find((group) => group.id === groupId)
	}

	@Patch(":groupId")
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Update properties of an existing group"
	})
	@ApiNotFoundResponse({ description: "Group not found", type: HttpNotFoundException })
	@ApiBadRequestResponse({ type: HttpBadRequestException })
	public async updateGroup(@Param("groupId") groupId: string, @Body() patchGroup: PatchGroup) {
		return this.authService.patchGroup(patchGroup, groupId)
	}

	@Delete(":groupId")
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Delete a group"
	})
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	@ApiConflictResponse({
		description: "The group is protected and cannot be deleted (see error for details)",
		type: HttpConflictException
	})
	@ApiBadRequestResponse({ type: HttpBadRequestException })
	public async deleteGroup(@Param("groupId") groupId: string) {
		return this.authService.deleteGroup(groupId)
	}

	@Post()
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Create a new group"
	})
	@ApiBadRequestResponse({ type: HttpBadRequestException })
	public async createGroup(@Body() newGroup: NewGroup) {
		return this.authService.createGroup(newGroup)
	}
}
