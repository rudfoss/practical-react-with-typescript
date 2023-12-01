import styled from "@emotion/styled"
import { ChangeEvent, useId, memo } from "react"

import { useFieldsService } from "./FieldsService"

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 4px;
`
const Label = styled.label`
	padding-left: 4px;
`

export interface BooleanFieldProps {
	label: string
	value: boolean
	setValue: (newValue: boolean) => unknown
}

export const BooleanField = memo(
	({ label, value, setValue }: BooleanFieldProps) => {
		const id = useId()
		const { isDisabled } = useFieldsService()

		const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
			setValue(evt.target.checked)
		}

		return (
			<Container>
				<input
					id={id}
					type="checkbox"
					checked={value}
					disabled={isDisabled}
					onChange={onInputChange}
				/>
				<Label htmlFor={id}>{label}</Label>
			</Container>
		)
	}
)
