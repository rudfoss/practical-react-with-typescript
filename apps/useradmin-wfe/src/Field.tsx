import { cloneElement, useId } from "react"

export interface FieldProps {
	label: string
	labelPosition?: "before" | "after"
	children: React.ReactElement
}

export const Field = ({ label, labelPosition = "before", children }: FieldProps) => {
	const id = useId()
	const childWithId = cloneElement(children, { id })

	return (
		<>
			{labelPosition === "before" && <label htmlFor={id}>{label}</label>}
			{childWithId}
			{labelPosition === "after" && <label htmlFor={id}>{label}</label>}
		</>
	)
}
