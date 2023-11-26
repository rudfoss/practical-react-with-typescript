import { GetProductsOptions, ProductsService } from "./ProductsService"
import { Product, products as staticProducts } from "./data"

export class InMemoryProductsService implements ProductsService {
	protected inMemoryProductList: Product[]

	public constructor(products: Product[]) {
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
}
