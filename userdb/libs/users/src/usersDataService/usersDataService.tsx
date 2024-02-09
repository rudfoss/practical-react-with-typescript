import { ReactNode, createContext, useContext, useMemo } from "react"

import { UsersControllerClient } from "@react-workshop/userdb-api-client"

import { UsersDataQueries, createUserDataQueries } from "./userDataQueries"

export interface UsersDataServiceContextProps {
	usersClient: UsersControllerClient
	queries: UsersDataQueries
}

const UsersDataServiceContext = createContext<UsersDataServiceContextProps | undefined>(undefined)
UsersDataServiceContext.displayName = "UsersDataServiceContext"

export const useUsersDataService = () => {
	const context = useContext(UsersDataServiceContext)
	if (!context) throw new Error("UsersDataService must be provided before use")
	return context
}

export interface ProvideUsersDataServiceProps {
	baseUrl?: string
	children: ReactNode
}

export const ProvideUsersDataService = ({
	baseUrl = "/",
	children
}: ProvideUsersDataServiceProps) => {
	const usersClient = useMemo(() => new UsersControllerClient(baseUrl), [baseUrl])
	const queries = useMemo(() => createUserDataQueries(usersClient), [usersClient])

	const value = useMemo((): UsersDataServiceContextProps => {
		return {
			usersClient,
			queries
		}
	}, [queries, usersClient])
	return (
		<UsersDataServiceContext.Provider value={value}>{children}</UsersDataServiceContext.Provider>
	)
}
