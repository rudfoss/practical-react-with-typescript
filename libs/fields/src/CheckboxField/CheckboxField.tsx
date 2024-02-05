import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer } from "../FieldStyles"

const FlexFieldContainer = styled(FieldContainer)`
	display: flex;
	align-items: center;
`
const Label = styled.label`
	display: block;
	padding-left: 4px;
	min-height: 1.2rem;
`

export interface CheckboxFieldProps {
	value: boolean
	onChange: (newValue: boolean) => unknown

	label: string
	disabled?: boolean
}

export const CheckboxField = ({ value, onChange, label, disabled }: CheckboxFieldProps) => {
	const id = useId()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.currentTarget.checked
		onChange(checked)
	}

	return (
		<FlexFieldContainer>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} disabled={disabled} />
			<Label htmlFor={id}>{label}</Label>
		</FlexFieldContainer>
	)
}
