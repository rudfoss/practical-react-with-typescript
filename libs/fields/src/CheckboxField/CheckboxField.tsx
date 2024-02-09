import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer, LabelAfter } from "../FieldStyles"
import { useFieldsServiceIsDisabled } from "../fieldsService"

const FlexFieldContainer = styled(FieldContainer)`
	display: flex;
	align-items: center;
`

export interface CheckboxFieldProps {
	value: boolean
	onChange: (newValue: boolean) => unknown

	label: string
	disabled?: boolean
}

export const CheckboxField = ({ value, onChange, label, disabled }: CheckboxFieldProps) => {
	const id = useId()
	const isGloballyDisabled = useFieldsServiceIsDisabled()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.currentTarget.checked
		onChange(checked)
	}

	return (
		<FlexFieldContainer>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={onInputChange}
				disabled={disabled || isGloballyDisabled}
			/>
			<LabelAfter htmlFor={id}>{label}</LabelAfter>
		</FlexFieldContainer>
	)
}
