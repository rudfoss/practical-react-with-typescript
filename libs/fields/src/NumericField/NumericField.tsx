import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

const Container = styled.div`
	padding: 4px;
`
const InputContainer = styled.div`
	display: flex;
	align-items: center;
`
const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`
const Input = styled.input`
	width: 100%;
`

interface ValueSpanProps {
	digitSize?: number
}
const ValueSpan = styled.span<ValueSpanProps>`
	padding: 4px 8px;
	font-size: 1.15rem;
	font-family: monospace;
	text-align: right;
	flex: 1 1 ${({ digitSize = 1 }) => `${digitSize}em`};
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
	const digitCount = Math.max(max.toString().length, min.toString().length)

	const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const numericValue = evt.target.valueAsNumber
		onChange(allowDecimals ? numericValue : Math.round(numericValue))
	}

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<InputContainer>
				<Input
					id={id}
					type={shouldUseRangeType ? "range" : "number"}
					min={min}
					max={max}
					value={value}
					onChange={onInputChange}
				/>
				{shouldUseRangeType && (
					<ValueSpan digitSize={digitCount}>{value}</ValueSpan>
				)}
			</InputContainer>
		</Container>
	)
}
