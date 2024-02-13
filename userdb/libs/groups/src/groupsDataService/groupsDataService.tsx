import { ReactNode, createContext, useContext, useMemo } from "react"

import { useApiClientsService } from "@react-workshop/userdb-api-clients"

import { GroupsDataQueries, createGroupsDataQueries } from "./groupsDataQueries"

export interface GroupsDataServiceContextProps {
	queries: GroupsDataQueries
}

const GroupsDataServiceContext = createContext<GroupsDataServiceContextProps | undefined>(undefined)
GroupsDataServiceContext.displayName = "GroupsDataServiceContext"

export const useGroupsDataService = () => {
	const context = useContext(GroupsDataServiceContext)
	if (!context) throw new Error("GroupsDataService must be provided before use")
	return context
}

export interface ProvideGroupsDataServiceProps {
	children: ReactNode
}

export const ProvideGroupsDataService = ({ children }: ProvideGroupsDataServiceProps) => {
	const { groupsClient } = useApiClientsService()

	const value = useMemo((): GroupsDataServiceContextProps => {
		const queries = createGroupsDataQueries(groupsClient)
		return {
			queries
		}
	}, [groupsClient])
	return (
		<GroupsDataServiceContext.Provider value={value}>{children}</GroupsDataServiceContext.Provider>
	)
}
