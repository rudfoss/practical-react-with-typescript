import { useId } from "react"

export interface CheckboxFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const CheckboxField = ({ label, value, onChange }: CheckboxFieldProps) => {
	const id = useId()

	return (
		<div>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked)}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
