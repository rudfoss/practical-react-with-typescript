import { ProvideFieldDisablingService } from "@prt/fields"
import { ProvideUserService } from "@prt/services"

import { DisableFields } from "./DisableFields"
import { Form } from "./Form"

export const App = () => {
	return (
		<ProvideUserService>
			<ProvideFieldDisablingService>
				<Form />
				<DisableFields />
			</ProvideFieldDisablingService>
		</ProvideUserService>
	)
}
