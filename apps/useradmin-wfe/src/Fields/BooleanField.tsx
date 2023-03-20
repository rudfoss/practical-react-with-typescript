import styled from "@emotion/styled"
import { useId } from "react"

const Checkbox = styled.input`
	margin: 8px;
`
const Label = styled.label`
	font-size: 1.1rem;
`

export interface BooleanFieldProps {
	label: string
	value: boolean
	onChange: (newValue: boolean) => unknown
}

export const BooleanField = ({ label, value, onChange }: BooleanFieldProps) => {
	const id = useId()

	const onCheckedChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<Checkbox id={id} type="checkbox" checked={value} onChange={onCheckedChange} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	)
}
