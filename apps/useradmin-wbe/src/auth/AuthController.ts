import {
	Body,
	Controller,
	HttpCode,
	Inject,
	Post,
	UnauthorizedException
} from "@nestjs/common"
import {
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from "@nestjs/swagger"

import { UserStore, UserStore_Token } from "../store"

import { Login, LoginResponse } from "./models"

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	public constructor(
		@Inject(UserStore_Token) protected readonly userStore: UserStore
	) {}

	@Post()
	@ApiOperation({
		description:
			"Given a user name and password will check whether that user exists and if so return an object with the user ID and name."
	})
	@HttpCode(200)
	@ApiOkResponse({
		type: LoginResponse,
		description: "The userName and password to attempt to log in"
	})
	@ApiUnauthorizedResponse({
		description: "UserName or password incorrect"
	})
	public async auth(@Body() authDto: Login): Promise<LoginResponse> {
		const user = await this.userStore.getUserByUserName(authDto.userName)
		if (user?.password !== authDto.password) throw new UnauthorizedException()
		return { id: user.id, userName: authDto.userName, authenticated: true }
	}
}
