import { useId } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean

	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({ label, disabled, value, onChange }: TextFieldProps) => {
	const id = useId()

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type="text"
				value={value}
				disabled={disabled}
				onChange={(event) => onChange(event.currentTarget.value)}
			/>
		</>
	)
}
