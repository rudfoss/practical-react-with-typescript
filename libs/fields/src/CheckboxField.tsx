import { useId } from "react"

export interface CheckboxFieldProps {
	value: boolean
	onChange: (newValue: boolean) => unknown

	label: string
	disabled?: boolean
}

export const CheckboxField = ({ value, onChange, label, disabled }: CheckboxFieldProps) => {
	const id = useId()

	return (
		<>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked)}
				disabled={disabled}
			/>
			<label htmlFor={id}>{label}</label>
		</>
	)
}
