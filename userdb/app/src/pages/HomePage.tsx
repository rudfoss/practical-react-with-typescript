import { CheckboxField, ProvideFieldsService, useFieldsService } from "@react-workshop/fields"
import { useHeading } from "@react-workshop/ui"
import { LoginBox } from "@react-workshop/userdb-libs-auth"

export const HomePage = () => {
	const { isDisabled, toggleIsDisabled } = useFieldsService()
	useHeading("User Database")

	return (
		<>
			<LoginBox />
			<ProvideFieldsService>
				<CheckboxField label="Disable all fields" value={isDisabled} onChange={toggleIsDisabled} />
			</ProvideFieldsService>
		</>
	)
}
