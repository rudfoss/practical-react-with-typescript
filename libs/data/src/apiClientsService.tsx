import { createContext, useContext, useMemo } from "react"

import { GroupsControllerClient, UsersControllerClient } from "@prt/clients"

interface APIClientsContextProps {
	usersClient: UsersControllerClient
	groupsClient: GroupsControllerClient
}

const APIClientsContext = createContext<APIClientsContextProps | undefined>(undefined)
APIClientsContext.displayName = "APIClientsContext"

export const useAPIClients = () => {
	const ctx = useContext(APIClientsContext)
	if (!ctx) throw new Error("Cannot use APIClientsContext before it is provided.")
	return ctx
}

export interface APIClientsProviderProps {
	baseUrl?: string
	children: React.ReactNode
}

export const APIClientsProvider = ({ baseUrl = "/", children }: APIClientsProviderProps) => {
	const apiClients = useMemo((): APIClientsContextProps => {
		return {
			usersClient: new UsersControllerClient(baseUrl),
			groupsClient: new GroupsControllerClient(baseUrl)
		}
	}, [baseUrl])

	return <APIClientsContext.Provider value={apiClients}>{children}</APIClientsContext.Provider>
}
