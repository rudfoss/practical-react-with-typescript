import { ClickUntil } from "./ClickUntil"
import { CombinedTextFieldClickUntil } from "./CombinedTextFieldClickUntil"
import { TextField } from "./TextField"

export const App = () => {
	return (
		<div>
			<TextField label="Test field" />
			<ClickUntil limit={10}>Limit reached</ClickUntil>
			<CombinedTextFieldClickUntil />
		</div>
	)
}
