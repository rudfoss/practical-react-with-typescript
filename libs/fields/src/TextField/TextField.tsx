import { useId } from "react"

import { TextFieldValue } from "./TextFieldValue"

interface TextFieldProps {
	label?: string
	className?: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	className,
	label = "Missing label",
	value,
	onChange
}: TextFieldProps) => {
	const id = useId()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.value)
	}

	return (
		<div className={className}>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} value={value} onChange={onInputChange} />
			<TextFieldValue value={value} />
		</div>
	)
}
