import { useId } from "react"

interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, onChange }: BooleanFieldProps) => {
	const id = useId()

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} />
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
