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
	const useRangeType = Math.abs(max - min) <= 50 && !allowDecimals

	const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		const numValue = evt.target.valueAsNumber
		onChange(allowDecimals ? numValue : Math.round(numValue))
	}

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={useRangeType ? "range" : "number"}
				min={min}
				max={max}
				value={value}
				onChange={onValueChange}
			/>
		</>
	)
}
