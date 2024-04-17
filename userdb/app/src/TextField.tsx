import { useId } from "react"

export interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
	disabled?: boolean
}

export const TextField = ({ label, value, onChange, disabled }: TextFieldProps) => {
	const id = useId()

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				onChange={(event) => onChange(event.currentTarget.value)}
				value={value}
				type="text"
				id={id}
				disabled={disabled}
			/>
		</div>
	)
}
