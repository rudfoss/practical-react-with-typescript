import { UnauthorizedException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Equals, IsOptional, IsString } from "class-validator"

/**
 * Equivalent to nests built-in `UnauthorizedException` but with swagger support.
 */
export class HttpUnauthorizedException extends UnauthorizedException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	error?: string

	@ApiProperty({
		enum: [401]
	})
	@Equals(401)
	statusCode: 401
}
