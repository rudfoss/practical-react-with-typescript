import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer, Label } from "../FieldStyles"
import { useFieldsServiceIsDisabled } from "../fieldsService"

const Input = styled.input`
	display: block;
	width: 100%;
`

export interface TextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	type?: "text" | "password"
	maxLength?: number

	label: string
	disabled?: boolean
}

export const TextField = ({
	value,
	onChange,
	disabled,
	label,
	type = "text",
	maxLength
}: TextFieldProps) => {
	const id = useId()
	const isGloballyDisabled = useFieldsServiceIsDisabled()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<FieldContainer>
			<Label htmlFor={id}>{label}</Label>
			<Input
				type={type}
				id={id}
				value={value}
				onChange={onInputChange}
				maxLength={maxLength}
				disabled={isGloballyDisabled || disabled}
			/>
		</FieldContainer>
	)
}
