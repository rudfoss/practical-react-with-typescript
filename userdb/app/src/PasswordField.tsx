import { TextField, TextFieldProps } from "./TextField"

export interface PasswordFieldProps extends Omit<TextFieldProps, "type"> {
	showPassword?: boolean
}

export const PasswordField = ({
	showPassword,
	...rest
}: PasswordFieldProps) => {
	return <TextField type={showPassword ? "text" : "password"} {...rest} />
}
