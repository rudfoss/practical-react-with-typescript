import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { FieldContainer, Label } from "../FieldStyles"
import { useFieldsServiceIsDisabled } from "../fieldsService"

const Textarea = styled.textarea`
	resize: vertical;
	display: block;
	width: 100%;
	min-height: 3lh;
	max-height: 30lh;
`

export interface MultiLineTextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	label: string
	disabled?: boolean

	maxLength?: number
}

export const MultiLineTextField = ({
	value,
	onChange,
	disabled,
	label,
	maxLength
}: MultiLineTextFieldProps) => {
	const id = useId()
	const isGloballyDisabled = useFieldsServiceIsDisabled()

	const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<FieldContainer>
			<Label htmlFor={id}>{label}</Label>
			<Textarea
				id={id}
				value={value}
				maxLength={maxLength}
				onChange={onTextareaChange}
				disabled={isGloballyDisabled || disabled}
			/>
		</FieldContainer>
	)
}
