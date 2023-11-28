import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Post,
	Query,
	Req,
	UseGuards
} from "@nestjs/common"
import { AuthService } from "./AuthService"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { bearerAuthName } from "./authConstants"
import { AuthGuard } from "./AuthGuard"
import { StoreApiRequest } from "../RequestReply"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"
import { BadRequestHttpProblem, HttpProblemResponse } from "../exceptions"
import { UserSession as UserSessionModel } from "./UserSession"
import { ZodGuard, ZodGuardBody, ZodGuardQuery } from "../ZodGuard"

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
}
