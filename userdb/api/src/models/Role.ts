import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString, Length, MaxLength } from "class-validator"

export class Role {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	id: string

	@ApiProperty({
		minLength: 1,
		maxLength: 256
	})
	@IsString()
	@Length(1, 256)
	displayName: string

	@ApiProperty({
		maxLength: 8196,
		required: false
	})
	@IsString()
	@IsOptional()
	@MaxLength(8196)
	description?: string

	@ApiProperty({
		description: "Is true if the role is built-in and cannot be removed"
	})
	@IsBoolean()
	isSystemRole: boolean
}
