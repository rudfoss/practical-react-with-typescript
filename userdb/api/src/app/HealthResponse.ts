import { ApiProperty } from "@nestjs/swagger"
import { IsRFC3339, IsString, Length, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

export class HealthRespose {
	public constructor(
		initialData?: Partial<ObjectFields<HealthRespose>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

	@ApiProperty()
	ok: boolean

	@ApiProperty({
		description: "RFC3339 timestamp for when the server first booted"
	})
	@IsRFC3339()
	bootTime: string

	@ApiProperty({
		maxLength: 64,
		minLength: 14,
		pattern: "P\\d+Y\\d+M\\d+DY\\d+H\\d+M\\d+S",
		example: "P0Y0M0DT0H0M12S"
	})
	@Length(14, 64)
	upTime: string

	@ApiProperty()
	@IsString()
	dbFilePath: string
}
