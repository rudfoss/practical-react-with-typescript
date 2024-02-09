import { ReactNode, createContext, useContext, useMemo } from "react"

import { GroupsControllerClient } from "@react-workshop/userdb-api-client"

import { GroupsDataQueries, createGroupsDataQueries } from "./groupsDataQueries"

export interface GroupsDataServiceContextProps {
	groupsClient: GroupsControllerClient
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
	baseUrl: string
	children: ReactNode
}

export const ProvideGroupsDataService = ({
	baseUrl = "/",
	children
}: ProvideGroupsDataServiceProps) => {
	const groupsClient = useMemo(() => new GroupsControllerClient(baseUrl), [baseUrl])
	const queries = useMemo(() => createGroupsDataQueries(groupsClient), [groupsClient])

	const value = useMemo((): GroupsDataServiceContextProps => {
		return {
			groupsClient,
			queries
		}
	}, [groupsClient, queries])
	return (
		<GroupsDataServiceContext.Provider value={value}>{children}</GroupsDataServiceContext.Provider>
	)
}
