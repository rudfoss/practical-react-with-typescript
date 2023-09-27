// export function TextField() {
// 	return "TextField component"
// }

import { useId } from "react"

export const TextField = () => {
	const id = useId()

	return (
		<div>
			<label htmlFor={id}>Enter some text</label>
			<input id={id} type="text" />
		</div>
	)
}

// export const TextFieldVanilla = () => {
// 	return React.createElement("span", { id: "an-id" }, "goodbye")
// }
