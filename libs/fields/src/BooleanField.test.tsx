import { render, screen } from "@testing-library/react"

import { BooleanField } from "./BooleanField"

describe("BooleanField", () => {
	it("is defined", () => {
		expect(typeof BooleanField).toBe("function")
	})

	it("renders correctly", async () => {
		const mockSetter = jest.fn()
		render(<BooleanField label="Boolean field" value={false} onChange={mockSetter} />)

		await screen.getByLabelText("Boolean field")
		await screen.getByRole("checkbox")
	})
})
