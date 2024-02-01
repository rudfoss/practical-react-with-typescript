import { ApiProperty } from "@nestjs/swagger"
import {
	IsBoolean,
	IsEnum,
	IsOptional,
	IsString,
	Length,
	MaxLength,
	ValidatorOptions
} from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

import { UserDatabaseRole } from "./UserDatabaseRole"

export class Group {
	public constructor(
		initialData?: Partial<ObjectFields<Group>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

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
		enum: UserDatabaseRole,
		isArray: true
	})
	@IsEnum(UserDatabaseRole, { each: true })
	roles: UserDatabaseRole[]
}
