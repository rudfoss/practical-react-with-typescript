import { ApiProperty } from "@nestjs/swagger"
import { IsRFC3339, IsString, Length } from "class-validator"

export class HealthRespose {
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
		minLength: 15,
		pattern: "P\\d+Y\\d+M\\d+DY\\d+H\\d+M\\d+S",
		example: "P0Y0M0DT0H0M12S"
	})
	@Length(15, 64)
	upTime: string

	@ApiProperty()
	@IsString()
	dbFilePath: string
}
