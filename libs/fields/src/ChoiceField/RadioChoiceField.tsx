import styled from "@emotion/styled"
import { useId } from "react"

import { LabelAfter } from "../FieldStyles"

import { ChoiceFieldProps } from "./ChoiceFieldProps"

const OptionContainer = styled.div`
	margin: 4px 0;
	display: flex;
	align-items: center;
`

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
				<OptionContainer key={option.value}>
					<input
						id={`${id}-${option.value}`}
						name={id}
						type="radio"
						checked={value === option}
						onChange={() => onChange(option)}
						disabled={disabled}
					/>
					<LabelAfter htmlFor={`${id}-${option.value}`}>{option.label}</LabelAfter>
				</OptionContainer>
			))}
		</fieldset>
	)
}
