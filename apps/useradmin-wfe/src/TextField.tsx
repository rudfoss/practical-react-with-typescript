import { useId, useState } from "react"

export const TextField = () => {
	const id = useId()
	const [textValue, setTextValue] = useState("")

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		setTextValue(evt.target.value)
	}

	return (
		<>
			<label htmlFor={id}>Label</label>
			<input type="text" id={id} onChange={onInputChange} />
			<p>{textValue}</p>
		</>
	)
}
