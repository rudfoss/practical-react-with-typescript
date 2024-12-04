import { useState } from "react"

import { CheckboxField } from "./CheckboxField"
import { PasswordField } from "./PasswordField"

export const App = () => {
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <>
      <PasswordField
        label="Password"
        minLength={8}
        maxLength={128}
        showPassword={isPasswordVisible}
        value={password}
        setValue={setPassword}
      />
      <CheckboxField
        label="Show password"
        value={isPasswordVisible}
        setValue={setIsPasswordVisible}
      />
    </>
  )
}
