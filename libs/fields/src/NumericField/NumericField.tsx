import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`

export interface NumericFieldProps {
	value?: number
	onChange: (newValue: number) => unknown

	label: string

	/**
	 * The minimum number allowed.
	 * @default 0
	 */
	min?: number
	/**
	 * The maximum number allowed.
	 * @default 100
	 */
	max?: number
	/**
	 * Whether or not to allow decimals.
	 */
	allowDecimals?: boolean
}

export const NumericField = ({
	value = 0,
	onChange,
	label,
	min = 0,
	max = 100,
	allowDecimals = false
}: NumericFieldProps) => {
	const id = useId()
	const shouldUseRangeType = Math.abs(max - min) <= 50 && !allowDecimals

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const numericValue = evt.target.valueAsNumber
		onChange(allowDecimals ? numericValue : Math.round(numericValue))
	}

	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<input
				id={id}
				type={shouldUseRangeType ? "range" : "number"}
				min={min}
				max={max}
				value={value}
				onChange={onInputChange}
			/>
		</div>
	)
}
