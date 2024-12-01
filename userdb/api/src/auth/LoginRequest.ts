import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class LoginRequest {
	@ApiProperty({
		minLength: 1,
		maxLength: 128,
		example: "guest"
	})
	@IsString()
	@Length(1, 128)
	username: string

	@ApiProperty({
		minLength: 1,
		maxLength: 128,
		example: "guest"
	})
	@IsString()
	@Length(1, 128)
	password: string
}
