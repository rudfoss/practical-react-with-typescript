import { CheckboxField, Header, TextField } from "@prwt/libs-ui"
import { useState } from "react"

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
