import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, IsUrl, Length, Min } from "class-validator"

export class Product {
	@ApiProperty({
		minLength: 21,
		maxLength: 128
	})
	@IsString()
	@Length(21, 128)
	id: string

	@ApiProperty()
	@IsString()
	@Length(1, 256)
	title: string

	@ApiProperty()
	@IsInt()
	@Min(0)
	priceCents: number

	@ApiProperty({ isArray: true, required: false })
	@IsString({ each: true })
	@Length(21, 128, { each: true })
	categoryIds?: string[]

	@ApiProperty({ isArray: true, required: false })
	@IsUrl({ require_host: true, allow_fragments: false }, { each: true })
	imageUrls?: string[]
}
