import { useState } from "react"

import { BooleanField } from "./BooleanField"
import { ClickUntil } from "./ClickUntil"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const App = () => {
	const [numValue, setNumValue] = useState(0)

	return (
		<NumericField
			label="Numeric Value"
			value={numValue}
			onChange={setNumValue}
			max={40}
		/>
		// <>
		// 	<TextField label="First name" value={firstName} onChange={setFirstName} />
		// 	<TextField label="Last name" value={lastName} onChange={setLastName} />
		// 	<BooleanField label="Make admin" value={isAdmin} onChange={setIsAdmin} />
		// 	<BooleanField
		// 		label="Disabled"
		// 		value={isDisabled}
		// 		onChange={setIsDisabled}
		// 	/>
		// 	<p>
		// 		Hi {isAdmin ? "admin" : ""} {firstName} {lastName}{" "}
		// 		{isDisabled ? "disabled" : ""}
		// 	</p>
		// </>
	)
}
