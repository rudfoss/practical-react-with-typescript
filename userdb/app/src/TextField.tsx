import { useId } from "react"

export interface TextFieldProps {
  label: string
  disabled?: boolean

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
        type="text"
        onChange={(event) => props.setValue(event.currentTarget.value)}
        disabled={props.disabled}
      />
    </div>
  )
}
