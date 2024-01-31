import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsOptional, IsString, Length, MaxLength } from "class-validator"

import { UserDbRole } from "./UserDbRole"

export class Group {
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
		description: "System-defined groups cannot be removed."
	})
	@IsBoolean()
	@IsOptional()
	isSystemDefined?: boolean

	@ApiProperty({
		enum: UserDbRole,
		isArray: true
	})
	@IsEnum(UserDbRole, { each: true })
	roles: UserDbRole[]
}
