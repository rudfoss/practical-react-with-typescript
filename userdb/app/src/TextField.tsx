import { useId, useState } from "react"

export interface TextFieldProps {
  label: string
  disabled?: boolean
}

export const TextField = (props: TextFieldProps) => {
  const id = useId()
  const [value, setValue] = useState("")

  const showMyText = () => {
    alert("You wrote: " + value)
  }

  return (
    <div>
      <label htmlFor={id}>{props.label}</label>
      <input
        value={value}
        id={id}
        type="text"
        onChange={(event) => setValue(event.currentTarget.value)}
        disabled={props.disabled}
      />
      <button onClick={showMyText} disabled={props.disabled}>
        Show my text
      </button>
    </div>
  )
}
