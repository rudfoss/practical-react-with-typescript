import { NotFoundException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Equals, IsOptional, IsString } from "class-validator"

/**
 * Equivalent to nests built-in `NotFoundException` but with swagger support.
 */
export class HttpNotFoundException extends NotFoundException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	error?: string

	@ApiProperty({
		enum: [404]
	})
	@Equals(404)
	statusCode: 404
}
