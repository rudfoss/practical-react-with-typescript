import { ChoiceFieldBaseProps, ChoiceFieldChoice } from "./ChoiceFieldChoice"
import { RadioChoiceField } from "./RadioChoiceField"
import { SelectChoiceField } from "./SelectChoiceField"

export interface ChoiceFieldProps<TChoice extends ChoiceFieldChoice>
	extends ChoiceFieldBaseProps<TChoice> {
	/**
	 * Specify whether the choice selector should be rendered as radio buttons or as a drop down.
	 */
	variant?: "radio" | "select"
}

export const ChoiceField = <TChoice extends ChoiceFieldChoice>({
	variant = "radio",
	...baseProps
}: ChoiceFieldProps<TChoice>) => {
	return variant === "radio" ? (
		<RadioChoiceField {...baseProps} />
	) : (
		<SelectChoiceField {...baseProps} />
	)
}
