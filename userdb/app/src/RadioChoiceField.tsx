import { useId } from "react"

import { ChoiceFieldBaseProps, ChoiceFieldChoice } from "./ChoiceFieldChoice"

export const RadioChoiceField = <TChoice extends ChoiceFieldChoice>({
	value,
	onChange,
	options,
	label
}: ChoiceFieldBaseProps<TChoice>) => {
	const id = useId()

	return (
		<fieldset>
			<legend>{label}</legend>
			{options.map((option) => (
				<div id={option.value}>
					<input
						type="radio"
						name={id}
						id={`${id}-${option.value}`}
						value={option.value}
						checked={value === option}
						onChange={() => onChange(option)}
					/>
					<label htmlFor={`${id}-${option.value}`}>{option.label}</label>
				</div>
			))}
		</fieldset>
	)
}
