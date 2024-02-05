import { ChangeEvent, useId } from "react"

export interface TextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	label: string
}

export const TextField = ({ value, onChange, label }: TextFieldProps) => {
	const id = useId()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} value={value} onChange={onInputChange} />
		</div>
	)
}
