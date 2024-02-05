import { ChangeEvent, useId } from "react"

export interface TextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	type?: "text" | "password"
	maxLength?: number

	label: string
}

export const TextField = ({ value, onChange, label, type = "text", maxLength }: TextFieldProps) => {
	const id = useId()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type={type} id={id} value={value} onChange={onInputChange} maxLength={maxLength} />
		</div>
	)
}
