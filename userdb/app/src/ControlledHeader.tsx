import { useState } from "react"
import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
import { TextField } from "./TextField"

export const ControlledHeader = () => {
	const [heading, setHeading] = useState("")
	const [useCustomHeading, setUseCustomHeading] = useState(true)

	return (
		<>
			<Header>{useCustomHeading ? heading : "Hello world!"}</Header>
			<TextField label="Heading" value={heading} onChange={setHeading} />
			<CheckboxField
				label="Use custom heading"
				value={useCustomHeading}
				onChange={setUseCustomHeading}
			/>
		</>
	)
}
