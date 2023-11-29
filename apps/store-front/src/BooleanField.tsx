import { ChangeEvent, useId, useState } from "react"

export interface BooleanFieldProps {
	label: string
}

export const BooleanField = (props: BooleanFieldProps) => {
	const id = useId()
	const [checked, setChecked] = useState(false)

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setChecked(evt.target.checked)
	}

	return (
		<>
			<input id={id} type="checkbox" onChange={onInputChange} />
			<label htmlFor={id}>{props.label}</label>
			<p>Checked: {checked ? "true" : "false"}</p>
		</>
	)
}
