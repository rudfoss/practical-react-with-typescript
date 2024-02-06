import { useId } from "react"

import { ChoiceFieldBaseProps } from "./ChoiceFieldBaseProps"

export const RadioChoiceField = <TData,>({
	value,
	onChange,
	options,
	label
}: ChoiceFieldBaseProps<TData>) => {
	const id = useId()

	return (
		<fieldset>
			<legend>{label}</legend>
			{options.map((option) => (
				<div id={option.value} key={option.value}>
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
