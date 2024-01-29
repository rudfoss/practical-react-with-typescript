import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class ProductCategory {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	id: string

	@IsString()
	@Length(1, 256)
	title: string
}
