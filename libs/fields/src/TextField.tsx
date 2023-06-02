import styled from "@emotion/styled"
import React, { useId } from "react"

import { useFieldStateService } from "./fieldStateService"

const Container = styled.div`
	padding: 8px;
	margin-bottom: 8px;
`
const Label = styled.label`
	display: block;
	margin-bottom: 8px;
`
const Input = styled.input`
	display: block;
	width: 100%;
`

interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = (props: TextFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldStateService()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		props.onChange(evt.target.value)
	}

	return (
		<Container>
			<Label htmlFor={id}>{props.label}</Label>
			<Input
				id={id}
				type="text"
				value={props.value}
				onChange={onInputChange}
				disabled={isDisabled}
			/>
		</Container>
	)
}
