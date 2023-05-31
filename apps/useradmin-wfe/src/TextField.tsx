import React, { useId } from "react"

interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = (props: TextFieldProps) => {
	const id = useId()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		props.onChange(evt.target.value)
	}

	return (
		<>
			<label htmlFor={id}>{props.label}</label>
			<input id={id} type="text" value={props.value} onChange={onInputChange} />
		</>
	)
}
