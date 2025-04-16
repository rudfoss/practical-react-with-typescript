import { BadRequestException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Equals, IsOptional, IsString } from "class-validator"

/**
 * Equivalent to nests built-in `BadRequestException` but with swagger support.
 */
export class HttpBadRequestException extends BadRequestException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	error?: string

	@ApiProperty({
		enum: [400]
	})
	@Equals(400)
	statusCode: 400
}
