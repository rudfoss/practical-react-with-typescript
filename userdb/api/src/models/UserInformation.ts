import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, ValidateNested, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

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
		isArray: true
	})
	@IsEnum(UserDatabaseRole, { each: true })
	roles: UserDatabaseRole[]

	@ApiProperty({
		type: Group,
		isArray: true
	})
	@ValidateNested()
	groups: Group[]
}
