import { render } from "@testing-library/react"

import { Header } from "./Header"

describe("Header", () => {
	it("should be defined", () => {
		expect(typeof Header).toBe("function")
	})

	it("renders the provided heading", () => {
		const { getByText } = render(<Header>Hello world</Header>)
		expect(getByText("Hello world")).toBeTruthy()
	})
})
