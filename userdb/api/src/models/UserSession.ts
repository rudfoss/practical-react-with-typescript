import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Length, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

export class UserSession {
	public constructor(
		initialData?: Partial<ObjectFields<UserSession>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

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
