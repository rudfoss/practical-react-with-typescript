import { render } from "@testing-library/react"

import { TextField } from "./TextField"
import { ProvideFieldStateService } from "./fieldStateService"

describe("TextField", () => {
	it("should render successfully", () => {
		const { baseElement } = render(
			<ProvideFieldStateService>
				<TextField label="Hello world" value="" onChange={() => ""} />
			</ProvideFieldStateService>
		)
		expect(baseElement).toBeTruthy()
	})

	it("should render the label as expected", () => {
		const { getByLabelText } = render(
			<ProvideFieldStateService>
				<TextField
					label="This is the expected label"
					value=""
					onChange={() => ""}
				/>
			</ProvideFieldStateService>
		)

		expect(getByLabelText("This is the expected label")).toBeTruthy()
	})
	it("should render the label as expected", () => {
		const { getByDisplayValue } = render(
			<ProvideFieldStateService>
				<TextField
					label=""
					value="This is the expected label"
					onChange={() => ""}
				/>
			</ProvideFieldStateService>
		)

		expect(getByDisplayValue("This is the expected label")).toBeTruthy()
	})
})
