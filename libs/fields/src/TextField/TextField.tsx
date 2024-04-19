import styled from "@emotion/styled"
import { useId } from "react"

import { Container, Label } from "../FieldStyles"
import { useFieldsServiceDisabled } from "../FieldsService"

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
	disabled,
	...inputProps
}: TextFieldProps) => {
	const id = useId()
	const fieldsServiceDisabled = useFieldsServiceDisabled()

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input
				onChange={(event) => onChange(event.currentTarget.value)}
				value={value}
				id={id}
				type={type}
				disabled={fieldsServiceDisabled || disabled}
				{...inputProps}
			/>
		</Container>
	)
}
