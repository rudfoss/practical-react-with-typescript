import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, Length } from "class-validator"

export class ProductRating {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	id: string

	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	productId: string

	@ApiProperty()
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
	rating: number
}
