import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { ProvideFieldsService } from "@practical-react/ui"
import {
  LoginRequest,
  useApiClientsService
} from "@practical-react/userdb-api-clients-react"

import { LoginForm } from "../LoginForm"
import { useHeaderService } from "../headerService"

export const LoginPage = () => {
  const { authClient, authUserClient, setSessionToken } = useApiClientsService()
  const { setHeader } = useHeaderService()
  useEffect(() => {
    setHeader("Login")
  }, [setHeader])

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: (loginRequest: LoginRequest) =>
      authClient.current.login(loginRequest)
  })
  const { data: currentUser } = useQuery({
    enabled: isSuccess,
    queryKey: ["currentUser"],
    queryFn: () => authUserClient.current.getCurrentUser()
  })

  const onLogin = async (username: string, password: string) => {
    const response = await mutateAsync({ username, password })
    setSessionToken(response.token)
  }

  return (
    <ProvideFieldsService isDisabled={isPending}>
      <LoginForm onLogin={onLogin} />
      <p>Current user: {currentUser?.user.displayName}</p>
    </ProvideFieldsService>
  )
}
