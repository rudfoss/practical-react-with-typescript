import { BooleanField } from "./BooleanField"
import { TextField } from "./TextField"

export const App = () => {
	return (
		<>
			<TextField label="First Name" />
			<TextField label="Last Name" />
			<BooleanField label="Check me" />
		</>
	)
}
