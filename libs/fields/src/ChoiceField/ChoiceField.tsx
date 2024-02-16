import { useFieldsServiceIsDisabled } from "../fieldsService"

import { ChoiceFieldProps } from "./ChoiceFieldProps"
import { RadioChoiceField } from "./RadioChoiceField"
import { SelectChoiceField } from "./SelectChoiceField"

export interface ChoiceFieldVariantProps<TDataType> extends ChoiceFieldProps<TDataType> {
	variant?: "radio" | "dropDown"
}

export const ChoiceField = <TDataType,>({
	variant = "dropDown",
	disabled,
	...props
}: ChoiceFieldVariantProps<TDataType>) => {
	const isGloballyDisabled = useFieldsServiceIsDisabled()
	const isDisabled = isGloballyDisabled || disabled

	return variant === "dropDown" ? (
		<SelectChoiceField disabled={isDisabled} {...props} />
	) : (
		<RadioChoiceField disabled={isDisabled} {...props} />
	)
}
