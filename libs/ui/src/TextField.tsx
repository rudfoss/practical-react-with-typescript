import { useId } from "react"

import { useFieldsServiceIsDisabled } from "./fieldsService"

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

export const TextField = ({
  label,
  value,
  setValue,
  type = "text",
  minLength,
  maxLength,
  disabled
}: TextFieldProps) => {
  const id = useId()
  const isGloballyDisabled = useFieldsServiceIsDisabled()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        onChange={(event) => setValue(event.currentTarget.value)}
        disabled={isGloballyDisabled || disabled}
      />
    </div>
  )
}
