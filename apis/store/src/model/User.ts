import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class User {
	@ApiProperty({
		minLength: 1,
		maxLength: 128
	})
	@IsString()
	@Length(1, 128)
	username: string

	@ApiProperty({
		minLength: 1,
		maxLength: 256
	})
	@IsString()
	@Length(1, 256)
	name: string
}
