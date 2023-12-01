import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Inject,
	NotFoundException,
	Param,
	Post,
	Query,
	Req,
	UseGuards
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { z } from "zod"

import { StoreApiRequest } from "../RequestReply"
import { ZodGuard, ZodGuardBody, ZodGuardQuery } from "../ZodGuard"
import { BadRequestHttpProblem, HttpProblemResponse } from "../exceptions"

import { AuthGuard, RequireRoles } from "./AuthGuard"
import { AuthService } from "./AuthService"
import { NewUser as NewUserModel, User as UserModel } from "./User"
import { UserSession as UserSessionModel } from "./UserSession"
import { bearerAuthName } from "./authConstants"

class User extends createZodDto(extendApi(UserModel)) {}
class NewUser extends createZodDto(extendApi(NewUserModel)) {}
class LoginRequest extends createZodDto(
	extendApi(
		z.object({
			username: z.string().min(1).max(128),
			password: z.string().min(1).max(128)
		})
	)
) {}
class UserSession extends createZodDto(extendApi(UserSessionModel)) {}
class RefreshSessionQuery extends createZodDto(
	extendApi(
		z.object({
			refresh: z
				.enum(["true", "false"])
				.transform((value) => value === "true")
				.optional()
		})
	)
) {}

@Controller("")
@UseGuards(ZodGuard)
@ApiBadRequestResponse({
	description: BadRequestHttpProblem.zodSchema.description,
	type: BadRequestHttpProblem
})
export class AuthController {
	public constructor(
		@Inject(AuthService) protected readonly authService: AuthService
	) {}

	@Get("auth/session")
	@ApiTags("Auth")
	@ApiOperation({
		summary: "Get the current users active session"
	})
	@ApiOkResponse({
		description: "The live session",
		type: UserSession
	})
	@ApiNotFoundResponse({
		description: "The user has no active session",
		type: HttpProblemResponse
	})
	@ApiBearerAuth(bearerAuthName)
	@ZodGuardQuery(RefreshSessionQuery)
	@UseGuards(AuthGuard)
	public async getSession(
		@Req() request: StoreApiRequest,
		@Query() query?: RefreshSessionQuery
	): Promise<UserSession> {
		const sessionInfo = this.authService.getUserSession(
			request.userSession?.session?.token ?? ""
		)
		if (!sessionInfo) {
			throw new NotFoundException()
		}

		if (query?.refresh) {
			const result = await this.authService.refreshUserSession(
				sessionInfo.session.token
			)
			if (!result) throw new NotFoundException()
			return result
		}

		return sessionInfo
	}

	@Post("auth/login")
	@ApiTags("Auth")
	@HttpCode(200)
	@ApiOperation({
		summary: "Log a user in"
	})
	@ApiOkResponse({
		type: UserSession
	})
	@ApiNotFoundResponse({
		type: HttpProblemResponse
	})
	@ZodGuardBody(LoginRequest)
	public async login(
		@Body() { username, password }: LoginRequest
	): Promise<UserSessionModel> {
		return await this.authService.loginUser(username, password)
	}

	@Post("auth/logout")
	@ApiTags("Auth")
	@HttpCode(201)
	@ApiOperation({
		summary: "Log the user out"
	})
	@ApiOkResponse({
		status: 201,
		description: "The user has been logged out"
	})
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async logout(@Req() request: StoreApiRequest) {
		if (request.userSession) {
			this.authService.logoutUser(request.userSession.session.token)
		}
	}

	@Get("users")
	@ApiTags("Users")
	@ApiOperation({
		description: "Requires the admin role",
		summary: "List all users"
	})
	@ApiOkResponse({
		type: User,
		isArray: true
	})
	@ApiBearerAuth(bearerAuthName)
	@RequireRoles(["admin"])
	@UseGuards(AuthGuard)
	public getUsers() {
		return this.authService.getUsers()
	}

	@Post("users")
	@ApiTags("Users")
	@HttpCode(200)
	@ApiOperation({
		summary: "Create a new user"
	})
	@ApiOkResponse({
		description: "The new user",
		type: User
	})
	@ApiBearerAuth(bearerAuthName)
	@RequireRoles(["admin"])
	@UseGuards(AuthGuard)
	@ZodGuardBody(NewUser)
	public async createUser(@Body() newUser: NewUser) {
		return await this.authService.createUser(newUser)
	}

	@Delete("users/:userId")
	@ApiTags("Users")
	@ApiOperation({
		summary: "Delete a user"
	})
	@ApiNotFoundResponse({
		description: "No user with the provided ID existed.",
		type: HttpProblemResponse
	})
	@ApiForbiddenResponse({
		description: "This user cannot be deleted. See response for details.",
		type: HttpProblemResponse
	})
	@ApiBearerAuth(bearerAuthName)
	@RequireRoles(["admin"])
	public deleteUser(@Param("userId") userId?: string) {
		if (!userId) return
		if (!this.authService.deleteUser(userId)) {
			throw new NotFoundException(`No user with id ${userId} exists`)
		}
	}
}
