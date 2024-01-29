import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class User {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	id: string

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

export class UserWithPassword extends User {
	@IsString()
	@Length(1, 128)
	password: string
}
