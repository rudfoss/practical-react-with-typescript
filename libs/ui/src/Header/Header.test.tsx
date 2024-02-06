import { render } from "@testing-library/react"

import { Header } from "./Header"
import { ProvideHeaderService } from "./headerService"

describe("Header", () => {
	it("is defined", () => {
		expect(typeof Header).toBe("function")
	})
	it("renders the provided header", () => {
		const { getByText } = render(
			<ProvideHeaderService initialHeading="Hello world">
				<Header />
			</ProvideHeaderService>
		)
		expect(getByText("Hello world")).toBeTruthy()
	})
})
