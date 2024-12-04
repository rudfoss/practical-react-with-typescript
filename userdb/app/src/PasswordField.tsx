import { TextField } from "./TextField"
import { TextFieldProps } from "./TextField"

export interface PasswordFieldProps
  extends Omit<TextFieldProps, "type" | "minLength" | "maxLength"> {
  showPassword?: boolean
  minLength: number
  maxLength: number
}

export const PasswordField = (props: PasswordFieldProps) => {
  const { showPassword, ...rest } = props
  const type = props.showPassword ? "text" : "password"
  return <TextField type={type} {...rest} />
}
