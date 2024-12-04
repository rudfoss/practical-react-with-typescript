import { useId } from "react"

export interface CheckboxFieldProps {
  label: string
  value: boolean
  setValue: (newValue: boolean) => unknown
  disabled?: boolean
}

export const CheckboxField = ({
  label,
  value,
  setValue,
  disabled
}: CheckboxFieldProps) => {
  const id = useId()

  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
