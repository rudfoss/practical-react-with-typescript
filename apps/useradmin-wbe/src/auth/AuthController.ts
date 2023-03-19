import { Body, Controller, HttpCode, Inject, Post, UnauthorizedException } from "@nestjs/common"
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"

import { UserStore, UserStore_Token } from "../store"

import { LoginDTO, LoginResponseDTO } from "./dtos"

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	public constructor(@Inject(UserStore_Token) protected readonly userStore: UserStore) {}

	@Post()
	@HttpCode(200)
	@ApiOkResponse({
		type: LoginResponseDTO,
		description: "The userName and password to attempt to log in"
	})
	@ApiUnauthorizedResponse({
		description: "UserName or password incorrect"
	})
	public async login(@Body() loginDto: LoginDTO): Promise<LoginResponseDTO> {
		const user = await this.userStore.getUserByUserName(loginDto.userName)
		if (user?.password !== loginDto.password) throw new UnauthorizedException()
		return { userName: loginDto.userName, authenticated: true }
	}
}
