import { ChangeEvent, useId } from "react"

export interface CheckboxFieldProps {
	value: boolean
	onChange: (newValue: boolean) => unknown

	label: string
	disabled?: boolean
}

export const CheckboxField = ({ value, onChange, label, disabled }: CheckboxFieldProps) => {
	const id = useId()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.currentTarget.checked
		onChange(checked)
	}

	return (
		<div>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} disabled={disabled} />
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
