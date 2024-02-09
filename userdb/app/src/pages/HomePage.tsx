import { CheckboxField, ProvideFieldsService, useFieldsService } from "@react-workshop/fields"
import { useHeading } from "@react-workshop/ui"
import { LoginBox } from "@react-workshop/userdb-libs-auth"

export const HomePage = () => {
	useHeading("User Database")
	const { isDisabled, setIsDisabled } = useFieldsService()

	return (
		<>
			<LoginBox />
			<ProvideFieldsService>
				<CheckboxField label="Disable all fields" value={isDisabled} onChange={setIsDisabled} />
			</ProvideFieldsService>
		</>
	)
}
