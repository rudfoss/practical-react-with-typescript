import { GetProductsOptions, ProductsService } from "./ProductsService"
import { Product, NewProduct, UpdateProduct } from "./Product"
import { importNanoid } from "../esmLoader"
import { initialProducts } from "./initialProducts"

const createProductSorter =
	(byField: GetProductsOptions["sortBy"], reverse = false) =>
	(a: Product, b: Product) => {
		let result = 0
		switch (byField) {
			case "id":
				result = a.id.localeCompare(b.id)
				break
			case "title":
				result = a.title.localeCompare(b.title)
				break
			case "price":
				result = b.price - a.price
				break
			case "rating":
				result = (b.rating ?? 0) - (a.rating ?? 0)
				break
			case "nrOfRatings":
				result = b.nrOfRatings - a.nrOfRatings
				break
		}

		return reverse ? result * -1 : result
	}

const createProductsFilter = (query?: string, categories?: string[]) => {
	if (!query && !categories) return () => true
	const lowerQuery = query?.toLocaleLowerCase()
	return ({ category, title, id, description }: Product) => {
		if (categories) {
			if (!categories.includes(category)) return false
		}
		if (!lowerQuery) return true

		return (
			`${title} ${id} ${description}`.toLocaleLowerCase().indexOf(lowerQuery) >=
			0
		)
	}
}

export class InMemoryProductsService implements ProductsService {
	protected inMemoryProductList: Map<string, Product>

	public constructor(products: Product[]) {
		this.inMemoryProductList = new Map(
			(products || initialProducts).map((product) => [
				product.id.toString(),
				product
			])
		)
	}

	public async getProducts(options?: GetProductsOptions) {
		const { query, categories, count, offset, sortBy, sortDirection } =
			GetProductsOptions.parse(options)

		let productList = Array.from(this.inMemoryProductList.values()).filter(
			createProductsFilter(query, categories)
		)
		productList.sort(createProductSorter(sortBy, sortDirection === "desc"))

		return productList.slice(offset * count).slice(0, count)
	}

	public async getProduct(id: string) {
		return this.inMemoryProductList.get(id)
	}

	public async newProduct(
		newProduct: NewProduct
	): Promise<Product | undefined> {
		const { nanoid } = await importNanoid()
		const newProductWithData = Product.parse({
			...newProduct,
			id: nanoid()
		})

		this.inMemoryProductList.set(newProductWithData.id, newProductWithData)
		return newProductWithData
	}

	public async updateProduct(
		id: string,
		updateProduct: UpdateProduct
	): Promise<Product | undefined> {
		const product = await this.getProduct(id)
		if (!product) return undefined

		const safeUpdatedProduct = Product.parse({
			...product,
			...updateProduct
		})

		this.inMemoryProductList.set(safeUpdatedProduct.id, safeUpdatedProduct)
		return safeUpdatedProduct
	}
}
