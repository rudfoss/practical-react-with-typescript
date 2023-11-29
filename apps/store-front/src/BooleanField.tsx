import { ChangeEvent, useId } from "react"

export interface BooleanFieldProps {
	label: string
	value: boolean
	setValue: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, setValue }: BooleanFieldProps) => {
	const id = useId()

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.checked)
	}

	return (
		<>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} />
			<label htmlFor={id}>{label}</label>
			<p>Checked: {value ? "true" : "false"}</p>
		</>
	)
}
