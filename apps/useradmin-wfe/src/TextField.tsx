// export function TextField() {
// 	return "TextField component"
// }

import { useId, useState } from "react"

export const TextField = () => {
	const id = useId()
	const [value, setValue] = useState("...")

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}
	const clearValue = () => {
		setValue("")
	}

	return (
		<div>
			<label htmlFor={id}>Enter some text</label>
			<input id={id} type="text" value={value} onChange={onInputChange} />
			<p>{value}</p>
			<button onClick={clearValue}>Clear</button>
		</div>
	)
}

// export const TextFieldVanilla = () => {
// 	return React.createElement("span", { id: "an-id" }, "goodbye")
// }
