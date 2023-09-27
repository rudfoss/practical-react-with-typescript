import { ChangeEvent, useId } from "react"

export interface NumericFieldProps {
	label: string
	value: number
	onChange: (newValue: number) => unknown

	min?: number
	max?: number
	allowDecimals?: boolean
}

export const NumericField = ({
	label,
	value,
	onChange,

	min = 0,
	max = 100,
	allowDecimals = false
}: NumericFieldProps) => {
	const id = useId()
	const shouldUseRangeType = Math.abs(max - min) <= 50 && !allowDecimals

	const onNumericInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const numericValue = evt.target.valueAsNumber
		onChange(allowDecimals ? numericValue : Math.round(numericValue))
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={shouldUseRangeType ? "range" : "number"}
				min={min}
				max={max}
				value={value}
				onChange={onNumericInputChange}
			/>
		</div>
	)
}
