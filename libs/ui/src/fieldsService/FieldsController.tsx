import { ReactNode, useState } from "react"

import { CheckboxField } from "../CheckboxField"

import { ProvideFieldsService } from "./fieldsService"

export interface FieldsControllerProps {
  children: ReactNode
}

export const FieldsController = ({ children }: FieldsControllerProps) => {
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <>
      <CheckboxField
        label="Disable all fields"
        value={isDisabled}
        setValue={setIsDisabled}
      />
      <ProvideFieldsService isDisabled={isDisabled}>
        {children}
      </ProvideFieldsService>
    </>
  )
}
