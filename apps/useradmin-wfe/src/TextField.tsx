import { useId, useState } from "react"

import { onValueChange } from "@prt/utils"

export interface TextFieldProps {
	label: string
}

export const TextField = ({ label }: TextFieldProps) => {
	const id = useId()
	const [value, setValue] = useState("")

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={onValueChange(setValue)} />
			<p>{value}</p>
		</div>
	)
}
