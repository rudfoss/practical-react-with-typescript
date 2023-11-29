import { BooleanField } from "./BooleanField"
import { NumericField } from "./NumericField"
import { TextField } from "./TextField"

export const App = () => {
	return (
		<>
			<TextField label="First Name" />
			<TextField label="Last Name" />
			<BooleanField label="Check me" />
			<NumericField label="Age" max={100} allowDecimals />
		</>
	)
}
