import { GetProductsOptions, ProductsService } from "./ProductsService"
import { Product, products as staticProducts } from "./data"
import path from "node:path"
import fs from "fs-extra"

export class InMemoryProductsService implements ProductsService {
	protected inMemoryProductList: Product[]

	public constructor(
		products: Product[],
		protected productImagesPath: string = path.join(
			__dirname,
			"products/data/images"
		)
	) {
		this.inMemoryProductList = products || staticProducts
	}

	public async getProducts(options?: GetProductsOptions) {
		const { count, offset, sortBy, sortDirection } =
			GetProductsOptions.parse(options)

		let productList = this.inMemoryProductList.slice(0)
		productList.sort((a, b) => {
			const aValue = a[sortBy]
			const bValue = b[sortBy]
			let result = 0

			if (typeof aValue === "number" && typeof bValue === "number") {
				result = aValue - bValue
			} else if (typeof aValue === "string" && typeof bValue === "string") {
				result = aValue.localeCompare(bValue)
			} else if (typeof aValue === "object" && typeof bValue === "object") {
				result = aValue.rate - bValue.rate
			}

			return sortDirection === "asc" ? result : result * -1
		})
		productList = productList.slice(offset * count).slice(0, count)
		return productList
	}

	public async getProduct(idToFind: number) {
		return this.inMemoryProductList.find(({ id }) => idToFind === id)
	}

	public async getProductImageFile(name: string) {
		const fileNames = await fs.readdir(this.productImagesPath)
		for (const fileName of fileNames) {
			if (fileName === name) {
				return path.join(this.productImagesPath, fileName)
			}
		}

		return undefined
	}
}
