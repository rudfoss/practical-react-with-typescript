import { useId } from "react"

export interface TextFieldProps {
	label: string
	disabled?: boolean
}

export const TextField = ({ label, disabled }: TextFieldProps) => {
	const id = useId()

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} disabled={disabled} />
		</div>
	)
}
