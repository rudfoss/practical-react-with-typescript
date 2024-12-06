import { useContext, useEffect } from "react"

import { HeaderContext } from "../HeaderContext"
import { LoginForm } from "../LoginForm"

const onLogin = (username: string, password: string) => {
  console.log({ username, password })
}

export const LoginPage = () => {
  const { setHeader } = useContext(HeaderContext)
  useEffect(() => {
    setHeader("Login")
  }, [setHeader])
  return <LoginForm onLogin={onLogin} />
}
