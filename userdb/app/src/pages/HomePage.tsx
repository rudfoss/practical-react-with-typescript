import { Link } from "react-router-dom"

import { CheckboxField, ProvideFieldsService, useFieldsService } from "@react-workshop/fields"

export const HomePage = () => {
	const { isDisabled, toggleIsDisabled } = useFieldsService()

	return (
		<>
			<Link to="/fields">Fields</Link>
			<ProvideFieldsService>
				<CheckboxField label="Disable all fields" value={isDisabled} onChange={toggleIsDisabled} />
			</ProvideFieldsService>
		</>
	)
}
