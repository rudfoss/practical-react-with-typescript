import styled from "@emotion/styled"
import React, { useId } from "react"

const StyledLabel = styled.label`
	display: block;
`

interface StyledInputProps {
	isRed: boolean
}
const StyledInput = styled.input<StyledInputProps>`
	padding: 16px;
	border: 3px solid #ccc;
	border-radius: 6px;
	background-color: ${(props) => (props.isRed ? "red" : "aqua")};
`

interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = (props: TextFieldProps) => {
	const id = useId()
	const isTooLong = props.value.length > 10

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		props.onChange(evt.target.value)
	}

	return (
		<>
			<StyledLabel htmlFor={id}>{props.label}</StyledLabel>
			<StyledInput
				isRed={isTooLong}
				id={id}
				type="text"
				value={props.value}
				onChange={onInputChange}
			/>
		</>
	)
}
