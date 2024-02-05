import { useId } from "react"

export interface TextFieldProps {
	label: string
}

export const TextField = ({ label }: TextFieldProps) => {
	const id = useId()

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} />
		</div>
	)
}
