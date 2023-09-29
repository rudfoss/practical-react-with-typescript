import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

import { useFieldsService } from "../FieldsService"

interface ContainerProps {
	borderSize: number
}
const Container = styled.div<ContainerProps>`
	padding: 4px;
	border: ${(props) => props.borderSize}px solid #ccc;
`
const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`

export interface NumericFieldProps {
	borderSize?: number
	label: string
	value: number
	onChange: (newValue: number) => unknown

	min?: number
	max?: number
	allowDecimals?: boolean
}

export const NumericField = ({
	borderSize = 1,
	label,
	value,
	onChange,

	min = 0,
	max = 100,
	allowDecimals = false
}: NumericFieldProps) => {
	const id = useId()
	const { isDisabled } = useFieldsService()
	const shouldUseRangeType = Math.abs(max - min) <= 50 && !allowDecimals

	const onNumericInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const numericValue = evt.target.valueAsNumber
		onChange(allowDecimals ? numericValue : Math.round(numericValue))
	}

	return (
		<Container borderSize={value}>
			<Label htmlFor={id}>{label}</Label>
			<input
				id={id}
				type={shouldUseRangeType ? "range" : "number"}
				min={min}
				max={max}
				value={value}
				onChange={onNumericInputChange}
				disabled={isDisabled}
			/>
		</Container>
	)
}
