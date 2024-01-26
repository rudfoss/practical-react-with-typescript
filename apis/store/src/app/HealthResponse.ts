import { ApiProperty } from "@nestjs/swagger"
import { IsRFC3339 } from "class-validator"

export class HealthRespose {
	@ApiProperty()
	ok: boolean

	@ApiProperty({
		pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z"
	})
	@IsRFC3339()
	bootTime: string

	@ApiProperty()
	upTime: string
}
