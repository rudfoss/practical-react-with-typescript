import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

export class RefreshSessionQuery {
	@ApiProperty({
		required: false,
		enum: ["true", "false"],
		description: "If 'true' the session expire time will be renewed if it is valid."
	})
	@IsEnum(["true", "false"], { message: `Value must be either "true" or "false" if set.` })
	@IsOptional()
	refresh?: string
}
