import { TextField } from "./TextField"

export const App = () => {
	return (
		<h1>
			<span role="img" aria-label="Rocket">
				🚀
			</span>
			<TextField label="First Name" />
			<TextField label="Last Name" />
		</h1>
	)
}
