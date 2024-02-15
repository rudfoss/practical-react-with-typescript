import { ChangeEvent, useId } from "react"

import { ChoiceFieldProps } from "./ChoiceFieldProps"

export const SelectChoiceField = <TDataType,>({
	label,
	value,
	onChange,
	options,
	disabled
}: ChoiceFieldProps<TDataType>) => {
	const id = useId()

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.currentTarget.value
		const selectedOption = options.find((anOption) => anOption.value === selectedValue)
		onChange(selectedOption)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select id={id} value={value?.value ?? ""} onChange={handleChange} disabled={disabled}>
				<option value=""></option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
