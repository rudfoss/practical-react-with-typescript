import { ChoiceFieldProps } from "./ChoiceFieldProps"
import { RadioChoiceField } from "./RadioChoiceField"
import { SelectChoiceField } from "./SelectChoiceField"

export interface ChoiceFieldVariantProps<TDataType> extends ChoiceFieldProps<TDataType> {
	variant?: "radio" | "dropDown"
}

export const ChoiceField = <TDataType,>({
	variant = "dropDown",
	...props
}: ChoiceFieldVariantProps<TDataType>) =>
	variant === "dropDown" ? <SelectChoiceField {...props} /> : <RadioChoiceField {...props} />
