// export function TextField() {
// 	return "TextField component"
// }

import { useId } from "react"

import { useFieldsService } from "../FieldsService"

import styles from "./TextField.module.css"

interface TextFieldProps {
	borderSize?: number

	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	borderSize = 1,
	label,
	value,
	onChange
}: TextFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldsService()

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value)
	}
	const clearValue = () => {
		onChange("")
	}

	return (
		<div className={styles.container} style={{ borderWidth: borderSize }}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				type="text"
				value={value}
				onChange={onInputChange}
				disabled={isDisabled}
			/>
			<button onClick={clearValue}>Clear</button>
		</div>
	)
}

// export const TextFieldVanilla = () => {
// 	return React.createElement("span", { id: "an-id" }, "goodbye")
// }
