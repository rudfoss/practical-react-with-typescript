import { ReactNode, createContext, useContext, useMemo } from "react"

import { useApiClientsService } from "@react-workshop/userdb-api-clients"

import { UsersDataQueries, createUserDataQueries } from "./userDataQueries"

export interface UsersDataServiceContextProps {
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
	children: ReactNode
}

export const ProvideUsersDataService = ({ children }: ProvideUsersDataServiceProps) => {
	const { usersClient } = useApiClientsService()

	const value = useMemo((): UsersDataServiceContextProps => {
		const queries = createUserDataQueries(usersClient)
		return {
			queries
		}
	}, [usersClient])
	return (
		<UsersDataServiceContext.Provider value={value}>{children}</UsersDataServiceContext.Provider>
	)
}
