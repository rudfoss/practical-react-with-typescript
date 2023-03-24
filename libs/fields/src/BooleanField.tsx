import { useId } from "react"

import { useFieldDisablingService } from "./FieldDisablingService"

export interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, onChange }: BooleanFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldDisablingService()

	const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<input
				id={id}
				type="checkbox"
				disabled={isDisabled}
				checked={value}
				onChange={onCheckboxChange}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
