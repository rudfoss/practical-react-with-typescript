import { Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDatabaseApiRequestAuthenticated as UserDatabaseApiRequestAuthenticated } from "../RequestReply"
import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { AuthService } from "../auth/AuthService"
import { HttpForbiddenException, HttpUnauthorizedException } from "../httpExceptions"
import { Group, UserDatabaseRole } from "../models"
import { StorageService, StorageServiceKey } from "../storage"

@Controller("groups")
@ApiTags("Groups")
@ApiForbiddenResponse({ type: HttpForbiddenException })
@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
export class GroupsController {
	public constructor(
		@Inject(AuthService) protected authService: AuthService,
		@Inject(StorageServiceKey) protected storageService: StorageService
	) {}

	@Get()
	@RequireRoles([UserDatabaseRole.UserAdmin, UserDatabaseRole.User])
	@ApiOperation({
		summary: "List all groups."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	@ApiOkResponse({ type: Group, isArray: true })
	public async getGroups() {
		return await this.storageService.getGroups()
	}

	@Get(":groupId")
	@ApiOperation({
		description: "Guests are only allowed to get information about groups they are a member of.",
		summary: "Get information about a specific group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async getGroup(
		@Param("groupId") groupId: string,
		@Req() request: UserDatabaseApiRequestAuthenticated
	) {
		if (request.userInformation.roles.includes(UserDatabaseRole.Guest)) {
			const groupIds = request.userInformation.user.groupIds ?? []
			if (!groupIds.includes(groupId)) return
		}
		const allGroups = await this.storageService.getGroups()
		return allGroups.find((group) => group.id === groupId)
	}

	@Patch(":groupId")
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Update properties of an existing group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async updateGroup(@Param("groupId") groupId: string) {}

	@Delete(":groupId")
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Delete a group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async deleteGroup(@Param("groupId") groupId: string) {}

	@Post()
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Create a new group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async createGroup() {}
}
