import styled from "@emotion/styled"
import { useId } from "react"

import { Container } from "./FieldStyles"

const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`
const Input = styled.input`
	display: block;
	width: 100%;
`

type InputPropsWithoutOnChange = Omit<
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	"onChange"
>
export interface TextFieldProps extends InputPropsWithoutOnChange {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	label,
	value,
	onChange,
	type = "text",
	...inputProps
}: TextFieldProps) => {
	const id = useId()

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input
				onChange={(event) => onChange(event.currentTarget.value)}
				value={value}
				id={id}
				type={type}
				{...inputProps}
			/>
		</Container>
	)
}
