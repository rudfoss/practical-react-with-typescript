import { slowDown } from "./slowDown"

describe("slowDown", () => {
	it("should be defined", () => {
		expect(typeof slowDown).toBe("function")
	})
	it("should return fib numbers", () => {
		expect(slowDown(1)).toBe(0)
	})
})
