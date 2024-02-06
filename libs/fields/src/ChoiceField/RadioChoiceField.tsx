import styled from "@emotion/styled"
import { useId } from "react"

import { LabelAfter } from "../FieldStyles"
import { useFieldsServiceIsDisabled } from "../fieldsService"

import { ChoiceFieldBaseProps } from "./ChoiceFieldBaseProps"

const OptionContainer = styled.div`
	margin: 4px 0;
	display: flex;
	align-items: center;
`

export const RadioChoiceField = <TData,>({
	value,
	onChange,
	options,
	label
}: ChoiceFieldBaseProps<TData>) => {
	const id = useId()
	const isDisabled = useFieldsServiceIsDisabled()

	return (
		<fieldset>
			<legend>{label}</legend>
			{options.map((option) => (
				<OptionContainer id={option.value} key={option.value}>
					<input
						type="radio"
						name={id}
						id={`${id}-${option.value}`}
						value={option.value}
						checked={value === option}
						onChange={() => onChange(option)}
						disabled={isDisabled}
					/>
					<LabelAfter htmlFor={`${id}-${option.value}`}>{option.label}</LabelAfter>
				</OptionContainer>
			))}
		</fieldset>
	)
}
