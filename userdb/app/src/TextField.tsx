import { ChangeEvent, useId } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean

	value: string
	onChange: (newText: string) => unknown
}

export const TextField = ({
	label,
	disabled,
	value,
	onChange
}: TextFieldProps) => {
	const id = useId()

	const updateValue = (eventObject: ChangeEvent<HTMLInputElement>) => {
		onChange(eventObject.target.value)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input value={value} id={id} disabled={disabled} onChange={updateValue} />
		</div>
	)
}
