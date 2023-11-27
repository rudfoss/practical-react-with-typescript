import {
	GetProductImageResult,
	GetProductsOptions,
	ProductsService
} from "./ProductsService"
import { Product, UpsertProduct, products as staticProducts } from "./data"
import path from "node:path"
import fs from "fs-extra"
import { importNanoid } from "../esmLoader"

export class InMemoryProductsService implements ProductsService {
	protected inMemoryProductList: Map<string, Product>

	public constructor(
		products: Product[],
		protected productImagesPath: string = path.join(
			__dirname,
			"products/data/images"
		)
	) {
		this.inMemoryProductList = new Map(
			(products || staticProducts).map((product) => [
				product.id.toString(),
				product
			])
		)
	}

	public async getProducts(options?: GetProductsOptions) {
		const { count, offset, sortBy, sortDirection } =
			GetProductsOptions.parse(options)

		let productList = Array.from(this.inMemoryProductList.values())
		productList.sort((a, b) => {
			const aValue = a[sortBy]
			const bValue = b[sortBy]
			let result = 0

			if (aValue === undefined) return -1
			if (bValue === undefined) return 1

			if (typeof aValue === "number" && typeof bValue === "number") {
				result = aValue - bValue
			} else if (typeof aValue === "string" && typeof bValue === "string") {
				result = aValue.localeCompare(bValue)
			} else if (typeof aValue === "object" && typeof bValue === "object") {
				result = (aValue.rate ?? 0) - (bValue.rate ?? 0)
			}

			return sortDirection === "asc" ? result : result * -1
		})
		productList = productList.slice(offset * count).slice(0, count)
		return productList
	}

	public async getProduct(id: string) {
		return this.inMemoryProductList.get(id)
	}

	public async getProductImageFile(
		name: string
	): Promise<GetProductImageResult | undefined> {
		const fileNames = await fs.readdir(this.productImagesPath)
		for (const fileName of fileNames) {
			if (fileName === name) {
				const [name, ext] = fileName.split(".")
				const fullPath = path.join(this.productImagesPath, fileName)
				return {
					path: fullPath,
					extension: ext,
					mimeType:
						ext.toLocaleLowerCase() === "png" ? "image/png" : "image/jpeg" // Hacky, I know
				}
			}
		}

		return undefined
	}

	public async upsertProduct(
		upsertProduct: UpsertProduct
	): Promise<Product | undefined> {
		if (upsertProduct.id) {
			const existingProduct = this.inMemoryProductList.get(upsertProduct.id)
			if (!existingProduct) return undefined

			const updatedProduct: Product = {
				...existingProduct,
				...upsertProduct,
				rating: {
					...(existingProduct.rating ?? {}),
					...(upsertProduct.rating ?? {})
				}
			}

			this.inMemoryProductList.set(updatedProduct.id, updatedProduct)
			return updatedProduct
		}

		const { nanoid } = await importNanoid()

		const newProduct: Product = {
			...upsertProduct,
			id: nanoid()
		}

		this.inMemoryProductList.set(newProduct.id, newProduct)
		return newProduct
	}
}
