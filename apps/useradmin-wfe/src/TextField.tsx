import { useId } from "react"

interface TextFieldProps {
	label?: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({ label = "Missing label", value, onChange }: TextFieldProps) => {
	const id = useId()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.value)
	}

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} value={value} onChange={onInputChange} />
			<p>{value}</p>
		</>
	)
}
