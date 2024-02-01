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
	ApiBearerAuth,
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
	HttpForbiddenException,
	HttpNotFoundException,
	HttpUnauthorizedException
} from "../httpExceptions"
import { NewUser, PatchUser, User, UserDatabaseRole } from "../models"

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth(bearerAuthName)
@UseGuards(AuthGuard)
@ApiForbiddenResponse({ type: HttpForbiddenException })
@ApiUnauthorizedResponse({ type: HttpUnauthorizedException })
export class UsersController {
	public constructor(@Inject(AuthService) protected authService: AuthService) {}

	@Get()
	@ApiOperation({
		summary: "Get all users"
	})
	@RequireRoles([UserDatabaseRole.User, UserDatabaseRole.UserAdmin])
	@ApiOkResponse({ type: User, isArray: true })
	public async getUsers() {
		return await this.authService.getUsers()
	}

	@Get(":userId")
	@ApiOperation({
		summary: "Get information about a specific user"
	})
	@ApiOkResponse({ type: User })
	@RequireRoles([UserDatabaseRole.User, UserDatabaseRole.UserAdmin])
	@ApiNotFoundResponse({ description: "No user found", type: HttpNotFoundException })
	public async getUser(@Param("userId") userId: string) {
		const allUsers = await this.authService.getUsers()
		const user = allUsers.find(({ id }) => id === userId)
		if (!user) throw new HttpNotFoundException(`No user found with the id ${userId}`)
		return user
	}

	@Patch(":userId")
	@ApiOperation({
		description:
			"Updates an existing user. Users and guests can only update themselves and cannot change their group memberships.",
		summary: "Update an existing user."
	})
	@ApiNotFoundResponse({ type: HttpNotFoundException })
	public async updateUser(
		@Param("userId") userId: string,
		@Body() user: PatchUser,
		@Req() request: UserDatabaseApiRequestAuthenticated
	) {
		if (
			request.userInformation.roles.includes(UserDatabaseRole.Admin) ||
			request.userInformation.roles.includes(UserDatabaseRole.UserAdmin)
		) {
			return this.authService.patchUser(user, userId)
		}

		if (userId !== request.userInformation.user.id) {
			throw new HttpUnauthorizedException(
				`You do not have sufficient permissions to perform a patch on user ${userId}`
			)
		}

		return this.authService.patchUser(user, userId)
	}

	@Delete(":userId")
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Delete the specified user."
	})
	public async deleteUser(@Param("userId") userId: string) {
		return await this.authService.deleteUser(userId)
	}

	@Post()
	@RequireRoles([UserDatabaseRole.UserAdmin])
	@ApiOperation({
		summary: "Create a new user."
	})
	public async createUser(@Body() newUser: NewUser) {
		return await this.authService.createUser(newUser)
	}
}
