// export function TextField() {
// 	return "TextField component"
// }

import { useId } from "react"

interface TextFieldProps {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({ label, value, onChange }: TextFieldProps) => {
	const id = useId()

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value)
	}
	const clearValue = () => {
		onChange("")
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={onInputChange} />
			<button onClick={clearValue}>Clear</button>
		</div>
	)
}

// export const TextFieldVanilla = () => {
// 	return React.createElement("span", { id: "an-id" }, "goodbye")
// }
