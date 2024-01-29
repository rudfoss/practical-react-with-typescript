import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Max, Min } from "class-validator"

export class GenericException {
	@ApiProperty()
	@IsString()
	message: string

	@ApiProperty()
	@IsString()
	error: string

	@ApiProperty()
	@IsInt()
	@Min(100)
	@Max(999)
	statusCode: number
}
