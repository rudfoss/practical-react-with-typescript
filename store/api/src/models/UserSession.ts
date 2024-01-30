import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Length } from "class-validator"

export class UserSession {
	@ApiProperty()
	@IsString()
	@Length(1, 128)
	token: string

	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	userId: string

	@ApiProperty({
		description: "The timestamp when the session was created (in milliseconds)"
	})
	@IsInt()
	createdAt: number

	@ApiProperty({
		description: "The timestamp when the session will expire (in milliseconds)"
	})
	@IsInt()
	expiresAt: number
}
