import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 4px;
`
const Label = styled.label`
	padding-left: 4px;
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
		<Container>
			<input id={id} type="checkbox" checked={value} onChange={onInputChange} />
			<Label htmlFor={id}>{label}</Label>
		</Container>
	)
}
