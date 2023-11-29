import { ChangeEvent, useId } from "react"

interface TextFieldProps {
	label: string
	value: string
	setValue: (newValue: string) => unknown
}

// type TextFieldPropsType = {
// 	label: string
// }

export const TextField = ({ label, value, setValue }: TextFieldProps) => {
	const id = useId()

	const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" onChange={onChangeHandler} />
			<p>{value}</p>
		</>
	)
}
