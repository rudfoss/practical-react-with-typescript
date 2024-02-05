import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger"
import { IsOptional, IsString, IsUrl, Length, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

export class User {
	public constructor(
		initialData?: Partial<ObjectFields<User>>,
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
		description:
			"Optionally specify a url for a picture of this user. Pictures are not hosted on this API"
	})
	@IsUrl()
	@IsOptional()
	pictureUrl?: string

	@ApiProperty({
		description: "A list of all group ids in which this user is a member."
	})
	@IsString({ each: true })
	@IsOptional()
	@Length(21, 128, { each: true })
	groupIds?: string[]
}

export class UserWithPassword extends User {
	@ApiProperty({
		minLength: 4,
		maxLength: 128
	})
	@IsString()
	@Length(4, 128)
	password: string
}

/**
 * A new user object is automatically assigned an id by the system.
 */
export class NewUser extends OmitType(UserWithPassword, ["id"] as const) {}

/**
 * A patch user allows updating properties of a User object, the ID must be provided separately.
 */
export class PatchUser extends PartialType(NewUser) {}
