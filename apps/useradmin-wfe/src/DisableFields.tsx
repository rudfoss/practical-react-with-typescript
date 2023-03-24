import { useFieldDisablingService } from "@prt/fields"

export const DisableFields = () => {
	const { setIsDisabled, isDisabled } = useFieldDisablingService()
	const onDisableToggle = () => {
		setIsDisabled(!isDisabled)
	}
	return <button onClick={onDisableToggle}>{isDisabled ? "Enable" : "Disable"}</button>
}
