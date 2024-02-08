import { useMutation, useQueryClient } from "@tanstack/react-query"

import { LoginRequest } from "@react-workshop/userdb-api-client"

import { useSessionTokenService } from "../sessionTokenService"

import { useAuthDataService } from "./authDataService"

export const useLogin = () => {
	const queryClient = useQueryClient()
	const { authClient, queries } = useAuthDataService()
	const { setSessionToken } = useSessionTokenService()

	return useMutation({
		mutationFn: (loginRequest: LoginRequest) => authClient.login(loginRequest),
		onSuccess: async (data) => {
			// First we need to invalidate all existing user data as it is no longer accurate.
			await queryClient.invalidateQueries({ queryKey: queries.currentUser() })
			// Then we can set the user data for the session as it is what is returned by the login mutation.
			queryClient.setQueryData(queries.session().queryKey, data)
		},
		onSettled: (data) => {
			setSessionToken(data?.token)
		}
	})
}

export const useLogout = (onSuccess?: () => unknown | Promise<unknown>) => {
	const queryClient = useQueryClient()
	const { authClient, queries } = useAuthDataService()
	const { setSessionToken } = useSessionTokenService()

	return useMutation({
		mutationFn: () => authClient.logout(),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: queries.currentUser() })
			setSessionToken()
			onSuccess?.()
		}
	})
}

export const useLogEveryoneOut = () => {
	const queryClient = useQueryClient()
	const { authClient, queries } = useAuthDataService()
	const { setSessionToken } = useSessionTokenService()

	return useMutation({
		mutationFn: () => authClient.logEveryoneOut(),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: queries.currentUser() })
			setSessionToken()
		}
	})
}
