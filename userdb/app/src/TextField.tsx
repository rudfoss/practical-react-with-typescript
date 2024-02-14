import { useId, useState } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean
}

export const TextField = ({ label, disabled }: TextFieldProps) => {
	const id = useId()
	const [value, setValue] = useState("")

	const clear = () => {
		setValue("")
	}

	return (
		<>
			<label htmlFor={id}>
				{label} - {value}
			</label>
			<input
				id={id}
				type="text"
				value={value}
				disabled={disabled}
				onChange={(event) => setValue(event.currentTarget.value)}
			/>
			<button onClick={clear}>Clear</button>
		</>
	)
}
