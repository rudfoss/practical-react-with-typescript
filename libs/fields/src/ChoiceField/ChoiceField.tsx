import { ChoiceFieldBaseProps } from "./ChoiceFieldBaseProps"
import { RadioChoiceField } from "./RadioChoiceField"
import { SelectChoiceField } from "./SelectChoiceField"

export interface ChoiceFieldProps<TData> extends ChoiceFieldBaseProps<TData> {
	/**
	 * Specify whether the choice selector should be rendered as radio buttons or as a drop down.
	 */
	variant?: "radio" | "select"
}

export const ChoiceField = <TData,>({
	variant = "radio",
	...baseProps
}: ChoiceFieldProps<TData>) => {
	return variant === "radio" ? (
		<RadioChoiceField {...baseProps} />
	) : (
		<SelectChoiceField {...baseProps} />
	)
}
