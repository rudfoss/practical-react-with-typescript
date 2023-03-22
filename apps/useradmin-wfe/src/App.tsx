import { ClickUntil } from "./ClickUntil"
import { Form } from "./Form"

export const App = () => {
	return (
		<>
			<Form>
				<h1>User Form</h1>
			</Form>
			<div>
				<ClickUntil limit={15} limitMessage="15 is the limit" />
			</div>
		</>
	)
}
