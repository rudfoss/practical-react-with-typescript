import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsRFC3339, IsString, Length, ValidatorOptions } from "class-validator"

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
		maxLength: 24,
		minLength: 24,
		pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
		example: "2024-01-26T15:27:04.285Z"
	})
	@IsRFC3339()
	@Length(24, 24)
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

	@ApiProperty()
	@IsInt()
	sessionCount: number

	@ApiProperty()
	@IsInt()
	userCount: number

	@ApiProperty()
	@IsInt()
	groupsCount: number
}
