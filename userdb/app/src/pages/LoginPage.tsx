import { useEffect } from "react"

import { LoginForm } from "../LoginForm"
import { useHeaderService } from "../headerService"

const onLogin = (username: string, password: string) => {
  console.log({ username, password })
}

export const LoginPage = () => {
  const { setHeader } = useHeaderService()
  useEffect(() => {
    setHeader("Login")
  }, [setHeader])
  return <LoginForm onLogin={onLogin} />
}
