import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { App } from "./HelloWorldApp"

describe("App", () => {
	it("is defined", () => {
		expect(typeof App).toEqual("function")
	})
	it("renders expected heading", () => {
		const { getByRole } = render(<App />)
		expect(getByRole("heading", { level: 1 })).toBeDefined()
	})
})
