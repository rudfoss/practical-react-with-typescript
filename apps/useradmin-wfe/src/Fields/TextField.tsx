import { useId, useState } from "react"

export interface TextFieldProps {
	label: string
}

export const TextField = ({ label }: TextFieldProps) => {
	const id = useId()
	const [value, setValue] = useState("")

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={(evt) => setValue(evt.target.value)} />
			<p>{value}</p>
		</div>
	)
}
