import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

export class RefreshSessionQuery {
	@ApiProperty({
		required: false,
		enum: ["true", "false"],
		description:
			"If 'true' the old session token will be removed and a new session object with a new token is returned. The createdAt timestamp of the old session is kept."
	})
	@IsEnum(["true", "false"], { message: `Value must be either "true" or "false" if set.` })
	@IsOptional()
	refresh?: string
}
