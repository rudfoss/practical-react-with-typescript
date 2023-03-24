import { ProvideUserService } from "@prt/services"

import { Form } from "./Form"

export const App = () => {
	return (
		<ProvideUserService>
			<Form />
		</ProvideUserService>
	)
}
