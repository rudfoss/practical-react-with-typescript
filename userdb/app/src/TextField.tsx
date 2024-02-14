import { useId } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean

	/**
	 * Specify whether you want a text field or a password field.
	 * @default "text"
	 */
	variant?: "text" | "password"
	maxLength?: number

	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	label,
	disabled,
	variant = "text",
	maxLength,
	value,
	onChange
}: TextFieldProps) => {
	const id = useId()

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={variant}
				value={value}
				disabled={disabled}
				maxLength={maxLength}
				onChange={(event) => onChange(event.currentTarget.value)}
			/>
		</>
	)
}
