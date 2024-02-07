import { ApiProperty } from "@nestjs/swagger"
import { IsInt, Min, ValidatorOptions } from "class-validator"

import { ObjectFields, ValidationError } from "@react-workshop/utils"

export class StatsResponse {
	public constructor(
		initialData?: Partial<ObjectFields<StatsResponse>>,
		validatorOptions?: ValidatorOptions
	) {
		if (initialData) {
			Object.assign(this, initialData)
			ValidationError.validateOrThrow(this, validatorOptions)
		}
	}

	@ApiProperty({
		minimum: 0
	})
	@IsInt()
	@Min(0)
	userCount: number

	@ApiProperty({
		minimum: 0
	})
	@IsInt()
	@Min(0)
	groupCount: number

	@ApiProperty({
		minimum: 0
	})
	@IsInt()
	@Min(0)
	sessionCount: number

	@ApiProperty({
		minimum: 0
	})
	@IsInt()
	@Min(1)
	adminCount: number

	@ApiProperty({
		minimum: 0
	})
	@IsInt()
	@Min(0)
	guestCount: number
}
