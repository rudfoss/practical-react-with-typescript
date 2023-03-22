import { useId } from "react"

export interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, onChange }: BooleanFieldProps) => {
	const id = useId()

	const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<input id={id} type="checkbox" checked={value} onChange={onCheckboxChange} />
			<label htmlFor={id}>{label}</label>
		</div>
	)
}