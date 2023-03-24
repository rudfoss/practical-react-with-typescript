import { createContext, useContext, useMemo } from "react"

import { GroupsControllerClient, UsersControllerClient } from "./clients"

interface APIClientsServiceContextProps {
	usersClient: UsersControllerClient
	groupsClient: GroupsControllerClient
}

const APIClientsServiceContext = createContext<APIClientsServiceContextProps | undefined>(undefined)
APIClientsServiceContext.displayName = "APIClientsServiceContext"

export const useAPIClientsService = () => {
	const ctx = useContext(APIClientsServiceContext)
	if (!ctx) throw new Error("APIClientsService must be provided before use")
	return ctx
}

export interface ProvideAPIClientsServiceProps {
	baseUrl: string
	children: React.ReactNode
}

export const ProvideAPIClientsService = ({ baseUrl, children }: ProvideAPIClientsServiceProps) => {
	const value = useMemo((): APIClientsServiceContextProps => {
		return {
			usersClient: new UsersControllerClient(baseUrl),
			groupsClient: new GroupsControllerClient(baseUrl)
		}
	}, [baseUrl])

	return (
		<APIClientsServiceContext.Provider value={value}>{children}</APIClientsServiceContext.Provider>
	)
}
