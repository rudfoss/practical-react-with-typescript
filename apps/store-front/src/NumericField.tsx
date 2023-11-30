import styled from "@emotion/styled"
import { ChangeEvent, useId, memo } from "react"

const Container = styled.div`
	padding: 4px;
`
const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`
const InputContainer = styled.div`
	display: flex;
	align-items: center;
`
const Input = styled.input`
	width: 100%;
`
interface ValueSpanProps {
	digitCount?: number
}
const ValueSpan = styled.span<ValueSpanProps>`
	padding: 4px 8px;
	font-size: 1.15rem;
	text-align: right;
	font-family: monospace;
	flex: 1 1 ${(props) => `${props.digitCount}em`};
`

export interface NumericFieldProps {
	label: string

	value: number
	setValue: (newValue: number) => unknown

	/**
	 * The minimum value allowed.
	 * @default 0
	 */
	min?: number

	/**
	 * The maximum value allowed.
	 * @default 100
	 */
	max?: number

	/**
	 * Whether or not decimals are allowed
	 */
	allowDecimals?: boolean
}

export const NumericField = memo(
	({
		label,
		value,
		setValue,
		min = 0,
		max = 100,
		allowDecimals = false
	}: NumericFieldProps) => {
		const id = useId()
		const shouldUseRangeType = Math.abs(max - min) <= 50 && !allowDecimals
		const digitCount = max.toString().length

		const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
			const newValue = evt.target.valueAsNumber
			if (isNaN(newValue)) {
				setValue(0)
				return
			}
			if (newValue < min) return
			if (newValue > max) return
			setValue(allowDecimals ? newValue : Math.round(newValue))
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
						<ValueSpan digitCount={digitCount}>{value}</ValueSpan>
					)}
				</InputContainer>
			</Container>
		)
	}
)
