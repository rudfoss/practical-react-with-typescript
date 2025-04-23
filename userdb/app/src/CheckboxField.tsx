import { ChangeEvent, useId } from "react"

export interface CheckboxFieldProps {
	label: string
	disabled?: boolean

	value: boolean
	onChange: (newChecked: boolean) => unknown
}

export const CheckboxField = ({
	label,
	disabled,
	value,
	onChange
}: CheckboxFieldProps) => {
	const id = useId()

	const checkedChange = (eventObject: ChangeEvent<HTMLInputElement>) => {
		onChange(eventObject.target.checked)
	}

	return (
		<div>
			<input
				type="checkbox"
				id={id}
				checked={value}
				onChange={checkedChange}
				disabled={disabled}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
