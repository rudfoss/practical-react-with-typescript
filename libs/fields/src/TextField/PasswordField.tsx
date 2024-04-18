import { TextField, TextFieldProps } from "./TextField"

export interface PasswordFieldProps extends TextFieldProps {
	showPassword?: boolean
}

export const PasswordField = ({ showPassword, type, ...textFieldProps }: PasswordFieldProps) => {
	const textFieldType = showPassword ? "text" : "password"
	return <TextField type={textFieldType} {...textFieldProps} />
}
