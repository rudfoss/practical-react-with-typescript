import { useId } from "react"

export interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({ label, value, onChange }: TextFieldProps) => {
	const id = useId()

	const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.value)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={onValueChange} />
		</div>
	)
}
