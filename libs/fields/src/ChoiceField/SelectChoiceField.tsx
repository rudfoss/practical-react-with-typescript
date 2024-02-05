import { ChangeEvent, useId } from "react"

import { ChoiceFieldBaseProps } from "./ChoiceFieldBaseProps"

export const SelectChoiceField = <TData,>({
	value,
	onChange,
	options,
	label
}: ChoiceFieldBaseProps<TData>) => {
	const id = useId()

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const option = options.find((option) => option.value === event.currentTarget.value)
		onChange(option)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select value={value?.value ?? ""} onChange={handleChange}>
				{options.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
