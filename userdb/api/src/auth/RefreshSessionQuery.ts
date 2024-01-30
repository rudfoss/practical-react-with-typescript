import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

export class RefreshSessionQuery {
	@ApiProperty({ required: false, enum: ["true", "false"] })
	@IsEnum(["true", "false"], { message: `Value must be either "true" or "false" if set.` })
	@IsOptional()
	refresh?: string
}
