import { Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserDbApiRequestAuthenticated } from "../RequestReply"
import { AuthGuard, RequireRoles, bearerAuthName } from "../auth"
import { AuthService } from "../auth/AuthService"
import { HttpForbiddenException, HttpUnauthorizedException } from "../httpExceptions"
import { Group, UserDbRole } from "../models"
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
	@RequireRoles([UserDbRole.UserAdmin, UserDbRole.User])
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
		@Req() request: UserDbApiRequestAuthenticated
	) {
		if (request.roles.includes(UserDbRole.Guest)) {
			const groupIds = request.user.groupIds ?? []
			if (!groupIds.includes(groupId)) return undefined
		}
		return (await this.storageService.getGroups()).find((group) => group.id === groupId)
	}

	@Post()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Create a new group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async createGroup() {}

	@Put()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Update an existing group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async updateGroup() {}

	@Delete()
	@RequireRoles([UserDbRole.UserAdmin])
	@ApiOperation({
		summary: "Delete a group."
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async deleteGroup() {}
}
