import { ChangeEvent, useId } from "react"

export interface MultiLineTextFieldProps {
	value: string
	onChange: (newValue: string) => unknown

	label: string

	maxLength?: number
}

export const MultiLineTextField = ({
	value,
	onChange,
	label,
	maxLength
}: MultiLineTextFieldProps) => {
	const id = useId()

	const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.currentTarget.value)
	}

	return (
		<div>
			<label htmlFor={id} />
			<textarea id={id} value={value} maxLength={maxLength} onChange={onTextareaChange} />
		</div>
	)
}
