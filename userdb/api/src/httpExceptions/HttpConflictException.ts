import { ConflictException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Equals, IsOptional, IsString } from "class-validator"

export class HttpConflictException extends ConflictException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	error?: string

	@ApiProperty({
		enum: [409]
	})
	@Equals(409)
	statusCode: 409

	public constructor(
		objectOrError?: ConstructorParameters<typeof ConflictException>[0],
		descriptionOrOptions?: ConstructorParameters<typeof ConflictException>[1]
	) {
		super(objectOrError, descriptionOrOptions)
	}
}
