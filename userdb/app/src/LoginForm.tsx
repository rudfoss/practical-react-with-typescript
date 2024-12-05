import { useState } from "react"

import { CheckboxField, PasswordField, TextField } from "@practical-react/ui"

export interface LoginFormProps {
  disabled?: boolean
  onLogin: (username: string, password: string) => unknown
}

export const LoginForm = ({ onLogin, disabled }: LoginFormProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isValid = username.length > 0 && password.length > 0

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return

    onLogin(username, password)
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="User name"
        value={username}
        minLength={1}
        setValue={setUsername}
        disabled={disabled}
      />
      <PasswordField
        minLength={1}
        maxLength={128}
        label="Password"
        value={password}
        setValue={setPassword}
        disabled={disabled}
        showPassword={isPasswordVisible}
      />
      <CheckboxField
        label="Show password"
        value={isPasswordVisible}
        setValue={setIsPasswordVisible}
        disabled={disabled}
      />
      <button disabled={!isValid || disabled}>Log in</button>
    </form>
  )
}
