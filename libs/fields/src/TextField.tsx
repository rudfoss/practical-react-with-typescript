import { useId } from "react"

import { Container, Input, Label } from "./fieldComponents"

export interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({ label, value, onChange }: TextFieldProps) => {
	const id = useId()

	const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.value)
	}

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} type="text" value={value} onChange={onValueChange} />
		</Container>
	)
}
