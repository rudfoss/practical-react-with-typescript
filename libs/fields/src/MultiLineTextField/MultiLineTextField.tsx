import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer, Label } from "../FieldStyles"

const Textarea = styled.textarea`
	resize: vertical;
	display: block;
	width: 100%;
`

export interface MultiLineTextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	label: string

	maxLength?: number
}

export const MultiLineTextField = ({
	value,
	onChange,
	label,
	maxLength
}: MultiLineTextFieldProps) => {
	const id = useId()

	const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<FieldContainer>
			<Label htmlFor={id}>{label}</Label>
			<Textarea id={id} value={value} maxLength={maxLength} onChange={onTextareaChange} />
		</FieldContainer>
	)
}
