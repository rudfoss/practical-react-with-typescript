import { useId } from "react"

type InputPropsWithoutOnChange = Omit<
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	"onChange"
>

export interface TextFieldProps extends InputPropsWithoutOnChange {
	label: string
	value: string
	onChange: (newValue: string) => unknown
}

export const TextField = ({
	label,
	value,
	onChange,
	type = "text",
	...inputProps
}: TextFieldProps) => {
	const id = useId()

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				onChange={(event) => onChange(event.currentTarget.value)}
				value={value}
				id={id}
				type={type}
				{...inputProps}
			/>
		</div>
	)
}
