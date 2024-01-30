import { ForbiddenException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Equals, IsOptional, IsString } from "class-validator"

/**
 * Equivalent to nests built-in `ForbiddenException` but with swagger support.
 */
export class HttpForbiddenException extends ForbiddenException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	error?: string

	@ApiProperty({
		enum: [403]
	})
	@Equals(403)
	statusCode: 403

	public constructor(
		objectOrError?: ConstructorParameters<typeof ForbiddenException>[0],
		descriptionOrOptions?: ConstructorParameters<typeof ForbiddenException>[1]
	) {
		super(objectOrError, descriptionOrOptions)
	}
}
