import { useId } from "react"

export interface TextFieldProps {
  label: string
  disabled?: boolean

  /**
   * @default text
   */
  type?: "text" | "password"
  // type?: TextInput
  minLength?: number
  maxLength?: number
  // minLength?: React.InputHTMLAttributes<HTMLInputElement>["minLength"]
  // maxLength?: React.InputHTMLAttributes<HTMLInputElement>["maxLength"]

  value: string
  setValue: (newValue: string) => unknown
}

export const TextField = (props: TextFieldProps) => {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{props.label}</label>
      <input
        value={props.value}
        id={id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type ?? "text"}
        onChange={(event) => props.setValue(event.currentTarget.value)}
        disabled={props.disabled}
      />
    </div>
  )
}
