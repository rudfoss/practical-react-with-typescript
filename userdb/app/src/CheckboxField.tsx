import { useId } from "react"

export interface CheckboxFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
	disabled?: boolean
}

export const CheckboxField = ({ label, value, onChange, disabled }: CheckboxFieldProps) => {
	const id = useId()

	return (
		<div>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked)}
				disabled={disabled}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
