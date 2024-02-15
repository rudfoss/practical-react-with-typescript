import styled from "@emotion/styled"
import { useId } from "react"

import { FieldContainer, Label } from "./FieldStyles"

const Input = styled.input`
	display: block;
	width: 100%;
`

export interface TextFieldProps {
	label: string
	disabled?: boolean

	/**
	 * Specify whether you want a text field or a password field.
	 * @default "text"
	 */
	variant?: "text" | "password"
	maxLength?: number

	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	label,
	disabled,
	variant = "text",
	maxLength,
	value,
	onChange
}: TextFieldProps) => {
	const id = useId()

	return (
		<FieldContainer>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				type={variant}
				value={value}
				disabled={disabled}
				maxLength={maxLength}
				onChange={(event) => onChange(event.currentTarget.value)}
			/>
		</FieldContainer>
	)
}
