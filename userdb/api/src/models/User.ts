import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, Length } from "class-validator"

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
	@IsOptional()
	displayName?: string

	@ApiProperty({
		isArray: true,
		description: "A list of all group ids in which this user is a member."
	})
	@IsString({ each: true })
	@IsOptional()
	@Length(21, 128, { each: true })
	groupIds?: string[]
}

export class UserWithPassword extends User {
	@ApiProperty({
		minLength: 1,
		maxLength: 128
	})
	@IsString()
	@Length(1, 128)
	password: string
}
