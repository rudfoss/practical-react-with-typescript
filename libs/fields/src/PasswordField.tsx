import { TextField, TextFieldProps } from "./TextField"

export type PasswordFieldProps = Omit<TextFieldProps, "variant">

export const PasswordField = (props: PasswordFieldProps) => (
	<TextField variant="password" {...props} />
)
