import { useMutation, useQueryClient } from "@tanstack/react-query"

import { LoginRequest, useApiClientsService } from "@react-workshop/userdb-api-clients"

import { useAuthDataService } from "./authDataService"

export const useLogin = () => {
	const queryClient = useQueryClient()
	const { queries } = useAuthDataService()
	const { setSessionToken, authClient } = useApiClientsService()

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

/**
 * If called will renew the current session (if it is still valid) and update corresponding query and session token data.
 * @returns
 */
export const useRefreshSession = () => {
	const queryClient = useQueryClient()
	const { queries } = useAuthDataService()
	const { setSessionToken, authUserClient } = useApiClientsService()

	return useMutation({
		mutationFn: () => authUserClient.getSession("true"),
		onSuccess: async (newSessionData) => {
			setSessionToken(newSessionData.token)
			await queryClient.invalidateQueries({ queryKey: queries.currentUser() })
			queryClient.setQueryData(queries.session().queryKey, newSessionData)
		},
		onSettled: (data) => {
			setSessionToken(data?.token)
		}
	})
}

export const useLogout = (onSuccess?: () => unknown | Promise<unknown>) => {
	const queryClient = useQueryClient()
	const { queries } = useAuthDataService()
	const { setSessionToken, authClient } = useApiClientsService()

	return useMutation({
		mutationFn: () => authClient.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: queries.currentUser() })
			setSessionToken()
			onSuccess?.()
		}
	})
}

export const useLogEveryoneOut = () => {
	const queryClient = useQueryClient()
	const { queries } = useAuthDataService()
	const { setSessionToken, authClient } = useApiClientsService()

	return useMutation({
		mutationFn: () => authClient.logEveryoneOut(),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: queries.sessions().queryKey })
			setSessionToken()
		}
	})
}
