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
import { AuthService } from "./AuthService"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { bearerAuthName } from "./authConstants"
import { AuthGuard, RequireRoles } from "./AuthGuard"
import { StoreApiRequest } from "../RequestReply"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"
import { BadRequestHttpProblem, HttpProblemResponse } from "../exceptions"
import { UserSession as UserSessionModel } from "./UserSession"
import { ZodGuard, ZodGuardBody, ZodGuardQuery } from "../ZodGuard"
import { NewUser as NewUserModel, User as UserModel } from "./User"

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

@Controller("auth")
@ApiTags("Auth")
@UseGuards(ZodGuard)
@ApiBadRequestResponse({
	description: BadRequestHttpProblem.zodSchema.description,
	type: BadRequestHttpProblem
})
export class AuthController {
	public constructor(
		@Inject(AuthService) protected readonly authService: AuthService
	) {}

	@Get("session")
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
	) {
		const sessionInfo = this.authService.getUserSession(
			request.session?.token ?? ""
		)
		if (!sessionInfo) {
			throw new NotFoundException()
		}

		if (query?.refresh) {
			return await this.authService.refreshUserSession(
				sessionInfo.session.token
			)
		}

		return sessionInfo.session
	}

	@Post("login")
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
	public async login(@Body() { username, password }: LoginRequest) {
		return await this.authService.loginUser(username, password)
	}

	@Post("logout")
	@HttpCode(201)
	@ApiOperation({
		summary: "Log the user out"
	})
	@ApiOkResponse({
		status: 201,
		description: "The user has been logged out"
	})
	public async logout(@Req() request: StoreApiRequest) {
		if (request.session) {
			this.authService.logoutUser(request.session.token)
		}
	}

	@Get("users")
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
