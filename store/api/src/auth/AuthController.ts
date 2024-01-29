import { Controller, Get, Inject, Post, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger"
import { IsBoolean, IsOptional } from "class-validator"

import { AuthService } from "./AuthService"
import { Session } from "./Session"
import { bearerAuthName } from "./authConstants"

class RefreshSessionQuery {
	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	refresh?: boolean
}

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	public constructor(@Inject(AuthService) protected authService: AuthService) {}

	@Post("login")
	public async login() {}

	@Get("session")
	@ApiOkResponse({ type: Session })
	@ApiBearerAuth(bearerAuthName)
	public async getSession(@Query() query: RefreshSessionQuery) {
		return { query }
	}

	@Get("logout")
	public async logout() {}
}
