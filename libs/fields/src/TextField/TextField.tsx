import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Container = styled.div`
	padding: 4px;
`
const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`
const Input = styled.input`
	display: block;
	width: 100%;
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
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} type="text" value={value} onChange={onInputChange} />
		</Container>
	)
}
