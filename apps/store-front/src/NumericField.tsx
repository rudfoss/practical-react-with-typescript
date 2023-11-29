import { ChangeEvent, useId, useState } from "react"

export interface NumericFieldProps {
	label: string

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

export const NumericField = ({
	label,
	min = 0,
	max = 100,
	allowDecimals = false
}: NumericFieldProps) => {
	const id = useId()
	const [value, setValue] = useState(0)
	const shouldUseRangeType = Math.abs(max - min) <= 50 && !allowDecimals

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
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={shouldUseRangeType ? "range" : "number"}
				min={min}
				max={max}
				value={value}
				onChange={onInputChange}
			/>
			{shouldUseRangeType && value}
		</div>
	)
}
