import { useId } from "react"

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
	const useRange = !allowDecimals && Math.abs(max - min) <= 50

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		const valueNum = evt.target.valueAsNumber
		if (isNaN(valueNum)) {
			onChange(0)
			return
		}

		if (valueNum < min || valueNum > max) {
			return
		}

		onChange(allowDecimals ? valueNum : Math.round(valueNum))
	}

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				min={min}
				max={max}
				type={useRange ? "range" : "number"}
				id={id}
				value={value}
				onChange={onInputChange}
			/>
		</>
	)
}
