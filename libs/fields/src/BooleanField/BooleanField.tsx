import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Label = styled.label`
	display: block;
`

export interface BooleanFieldProps {
	value?: boolean
	onChange: (newValue: boolean) => unknown

	label: string
}

export const BooleanField = ({
	value = false,
	onChange,
	label
}: BooleanFieldProps) => {
	const id = useId()

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.checked)
	}

	return (
		<div>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	)
}
