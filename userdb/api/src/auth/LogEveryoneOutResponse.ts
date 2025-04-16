import { ApiProperty } from "@nestjs/swagger"
import { ValidateNested, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "../utils"

import { UserSession } from "../models"

export class LogEveryoneOutResponse {
	public constructor(
		initialData?: Partial<ObjectFields<LogEveryoneOutResponse>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

	@ApiProperty({
		description: "Each session that was logged out",
		type: UserSession,
		isArray: true
	})
	@ValidateNested()
	removedSessions: UserSession[]
}
