import { ChangeEvent, useId, useState } from "react"

interface TextFieldProps {
	label: string
}

// type TextFieldPropsType = {
// 	label: string
// }

export const TextField = (props: TextFieldProps) => {
	const id = useId()
	const [value, setValue] = useState("")

	const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<>
			<label htmlFor={id}>{props.label}</label>
			<input id={id} type="text" onChange={onChangeHandler} />
			<p>{value}</p>
		</>
	)
}
