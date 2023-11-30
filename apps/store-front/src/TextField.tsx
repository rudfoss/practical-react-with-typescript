import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

export const Label = styled.label`
	display: block;
`
interface InputProps {
	inputWidthPercentage: number
}
export const Input = styled.input<InputProps>`
	display: block;
	width: ${(props) => props.inputWidthPercentage}%;
`

interface TextFieldProps {
	inputWidthPercentage?: number
	label: string
	value: string
	setValue: (newValue: string) => unknown
}

// type TextFieldPropsType = {
// 	label: string
// }

export const TextField = ({
	label,
	value,
	setValue,
	inputWidthPercentage = 100
}: TextFieldProps) => {
	const id = useId()

	const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<>
			<Label htmlFor={id}>{label}</Label>
			<Input
				inputWidthPercentage={inputWidthPercentage}
				id={id}
				type="text"
				value={value}
				onChange={onChangeHandler}
			/>
			<p>{value}</p>
		</>
	)
}
