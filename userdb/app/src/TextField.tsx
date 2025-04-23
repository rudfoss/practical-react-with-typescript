import { ChangeEvent, useId } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean

	/**
	 * @default "text"
	 */
	type?: "text" | "password"

	value: string
	onChange: (newText: string) => unknown
}

export const TextField = ({
	label,
	disabled,

	type = "text",

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
			<input
				type={type}
				value={value}
				id={id}
				disabled={disabled}
				onChange={updateValue}
			/>
		</div>
	)
}
