import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
	return (
		<>
			<Header>
				Hello <code>from</code> app
			</Header>
			<TextField label="First name" />
			<TextField label="Last name" />
		</>
	)
}
