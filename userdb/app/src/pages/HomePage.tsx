import { CheckboxField, ProvideFieldsService, useFieldsService } from "@react-workshop/fields"
import { useHeading } from "@react-workshop/ui"

export const HomePage = () => {
	useHeading("User Database")
	const { isDisabled, setIsDisabled } = useFieldsService()
	return (
		<ProvideFieldsService>
			<CheckboxField label="Disable all fields" value={isDisabled} onChange={setIsDisabled} />
		</ProvideFieldsService>
	)
}
