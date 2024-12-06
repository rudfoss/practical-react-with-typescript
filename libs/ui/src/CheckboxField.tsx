import { useId } from "react"

import { useFieldsServiceIsDisabled } from "./fieldsService"

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
  const isGloballyDisabled = useFieldsServiceIsDisabled()

  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
        disabled={isGloballyDisabled || disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
