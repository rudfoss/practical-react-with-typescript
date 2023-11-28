import {
	Body,
	Controller,
	Get,
	Inject,
	Logger,
	Post,
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
import { ZodGuard, ZodGuardBody } from "../ZodGuard"

class LoginRequest extends createZodDto(
	extendApi(
		z.object({
			username: z.string().min(1).max(128),
			password: z.string().min(1).max(128)
		})
	)
) {}
class UserSession extends createZodDto(extendApi(UserSessionModel)) {}

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
	@ApiBearerAuth(bearerAuthName)
	@UseGuards(AuthGuard)
	public async getSession(@Req() request: StoreApiRequest) {
		Logger.log(`User: ${JSON.stringify(request.user)}`)
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
