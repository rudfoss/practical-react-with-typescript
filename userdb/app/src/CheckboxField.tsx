import styled from "@emotion/styled"
import { useId } from "react"

import { Container } from "./FieldStyles"

const CheckboxContainer = styled(Container)`
	display: flex;
	align-items: center;
`

const Label = styled.label`
	padding-left: 4px;
	min-height: 1.2rem;
`

export interface CheckboxFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
	disabled?: boolean
}

export const CheckboxField = ({ label, value, onChange, disabled }: CheckboxFieldProps) => {
	const id = useId()

	return (
		<CheckboxContainer>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked)}
				disabled={disabled}
			/>
			<Label htmlFor={id}>{label}</Label>
		</CheckboxContainer>
	)
}
