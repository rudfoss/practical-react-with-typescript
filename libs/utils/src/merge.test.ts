import { merge } from "./merge"

class MockClass {
	foo: boolean
	bar: number
	baz: {
		bork: number[]
	}
}

describe("fromData", () => {
	it("is defined", () => {
		expect(typeof merge).toBe("function")
	})

	it("returns the same instance", () => {
		const instance = new MockClass()
		const modified = merge(instance, {})
		expect(instance).toBe(modified)
	})

	it("merges data into instance", () => {
		const instance = new MockClass()
		expect(instance).toEqual({})
		merge(instance, { foo: false })
		expect(instance).toEqual({
			foo: false
		})
	})

	it("preserves inheritance", () => {
		class MockExtended extends MockClass {
			foobar: string
		}

		const result = merge(new MockExtended(), { foobar: "yey" })
		expect(result).toBeInstanceOf(MockClass)
		expect(result).toBeInstanceOf(MockExtended)
	})
})
