import { useId } from "react"

import { ChoiceFieldProps } from "./ChoiceFieldProps"

export const RadioChoiceField = <TDataType,>({
	label,
	disabled,
	options,
	value,
	onChange
}: ChoiceFieldProps<TDataType>) => {
	const id = useId()

	return (
		<fieldset>
			<legend>{label}</legend>
			{options.map((option) => (
				<div key={option.value}>
					<input
						id={`${id}-${option.value}`}
						name={id}
						type="radio"
						checked={value === option}
						onChange={() => onChange(option)}
						disabled={disabled}
					/>
					<label htmlFor={`${id}-${option.value}`}>{option.label}</label>
				</div>
			))}
		</fieldset>
	)
}
