import { createContext, useContext, useMemo } from "react"

import {
	UsersControllerClient,
	GroupsControllerClient
} from "@prwt/useradmin-wbe-client"

interface UserApiServiceContextProps {
	usersClient: UsersControllerClient
	groupsClient: GroupsControllerClient
}

const UserApiServiceContext = createContext<
	UserApiServiceContextProps | undefined
>(undefined)
UserApiServiceContext.displayName = "UserApiServiceContext"

export const useUserApiService = () => {
	const ctx = useContext(UserApiServiceContext)
	if (!ctx) throw new Error("UserApiService must be provided before use")
	return ctx
}

export interface ProvideUserApiServiceProps {
	baseUrl: string
	children: React.ReactNode
}

export const ProvideUserApiService = ({
	baseUrl,
	children
}: ProvideUserApiServiceProps) => {
	const value = useMemo((): UserApiServiceContextProps => {
		return {
			usersClient: new UsersControllerClient(baseUrl),
			groupsClient: new GroupsControllerClient(baseUrl)
		}
	}, [baseUrl])

	return (
		<UserApiServiceContext.Provider value={value}>
			{children}
		</UserApiServiceContext.Provider>
	)
}
