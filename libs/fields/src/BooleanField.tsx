import { useId } from "react"

import { useFieldStateService } from "./fieldStateService"

interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = (props: BooleanFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldStateService()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		props.onChange(evt.target.checked)
	}

	return (
		<>
			<input
				id={id}
				type="checkbox"
				checked={props.value}
				onChange={onInputChange}
				disabled={isDisabled}
			/>
			<label htmlFor={id}>{props.label}</label>
		</>
	)
}
