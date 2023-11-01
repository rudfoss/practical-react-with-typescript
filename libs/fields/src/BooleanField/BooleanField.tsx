import { useId } from "react"

import { useFieldsService } from "../FieldsService"

interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, onChange }: BooleanFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldsService()

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<input
				id={id}
				type="checkbox"
				checked={value}
				onChange={onInputChange}
				disabled={isDisabled}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}
