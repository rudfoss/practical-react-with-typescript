import { useId, useState } from "react"

interface TextFieldProps {
	label?: string
}

export const TextField = ({ label = "Missing label" }: TextFieldProps) => {
	const id = useId()
	const [textValue, setTextValue] = useState("")

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		setTextValue(evt.target.value)
	}
	// const onClear = () => {
	// 	setTextValue("")
	// }

	return (
		<>
			{/* <button onClick={onClear}>Clear</button> */}
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} value={textValue} onChange={onInputChange} />
			<p>{textValue}</p>
		</>
	)
}
