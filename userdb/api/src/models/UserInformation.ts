import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsEnum, ValidateNested, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "../utils"

import { Group } from "./Group"
import { User } from "./User"
import { UserDatabaseRole } from "./UserDatabaseRole"

export class UserInformation {
	public constructor(
		initialData?: Partial<ObjectFields<UserInformation>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

	@ApiProperty()
	@ValidateNested()
	user: User

	@ApiProperty({
		enum: UserDatabaseRole,
		minLength: 1,
		isArray: true
	})
	@ArrayMinSize(1)
	@IsEnum(UserDatabaseRole, { each: true })
	roles: UserDatabaseRole[]

	@ApiProperty({
		type: Group,
		minLength: 1,
		isArray: true
	})
	@ArrayMinSize(1)
	@ValidateNested()
	groups: Group[]
}
