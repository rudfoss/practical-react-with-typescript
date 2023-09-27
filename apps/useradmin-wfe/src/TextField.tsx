// export function TextField() {
// 	return "TextField component"
// }

import { useId, useState } from "react"

export const TextField = () => {
	const id = useId()
	const [value, setValue] = useState("...")

	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<div>
			<label htmlFor={id}>Enter some text</label>
			<input id={id} type="text" onChange={onChange} />
			<p>{value}</p>
		</div>
	)
}

// export const TextFieldVanilla = () => {
// 	return React.createElement("span", { id: "an-id" }, "goodbye")
// }
