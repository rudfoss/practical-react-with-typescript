import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer, Label } from "../FieldStyles"

import { ChoiceFieldProps } from "./ChoiceFieldProps"

const Select = styled.select`
	display: block;
	width: 100%;
`

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
		<FieldContainer>
			<Label htmlFor={id}>{label}</Label>
			<Select id={id} value={value?.value ?? ""} onChange={handleChange} disabled={disabled}>
				<option value=""></option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</FieldContainer>
	)
}
