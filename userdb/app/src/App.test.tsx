import { describe, it, expect } from "vitest"
import { App } from "./App"

describe("App", () => {
	it("is defined", () => {
		expect(typeof App).toEqual("function")
	})
})
