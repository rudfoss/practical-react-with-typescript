import { ChangeEvent, useId } from "react"

import classes from "./CheckboxField.module.css"

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
		<div className={classes.container}>
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
