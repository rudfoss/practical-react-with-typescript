import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Label = styled.label`
	display: block;
`
const Input = styled.input`
	display: block;
`

export interface TextFieldProps {
	value?: string
	onChange: (newValue: string) => unknown

	label: string
}

export const TextField = ({ value = "", onChange, label }: TextFieldProps) => {
	const id = useId()

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value)
	}

	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} type="text" value={value} onChange={onInputChange} />
		</div>
	)
}
