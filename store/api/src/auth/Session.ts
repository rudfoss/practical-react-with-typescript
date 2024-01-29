import { ApiProperty } from "@nestjs/swagger"
import { IsRFC3339, IsString, Length } from "class-validator"

export class Session {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	userId: string

	@ApiProperty()
	@IsString()
	@Length(1, 128)
	token: string

	@ApiProperty({
		maxLength: 24,
		minLength: 24,
		pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
		example: "2024-01-26T15:27:04.285Z"
	})
	@IsRFC3339()
	@Length(24, 24)
	createdAt: string

	@ApiProperty({
		maxLength: 24,
		minLength: 24,
		pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
		example: "2024-01-26T15:27:04.285Z"
	})
	@IsRFC3339()
	@Length(24, 24)
	expiresAt: string
}
