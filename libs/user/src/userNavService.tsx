import { createContext, useContext } from "react"

interface UserNavServiceContextProps {
	createUserDetailsPath: (userId: string) => string
	createGroupDetailsPath: (groupId: string) => string
}

const UserNavServiceContext = createContext<
	UserNavServiceContextProps | undefined
>(undefined)
UserNavServiceContext.displayName = "UserNavServiceContext"

export const useUserNavService = () => {
	const context = useContext(UserNavServiceContext)
	if (!context)
		throw new Error("NavServiceContext cannot be used before it is provided.")
	return context
}

export interface UserNavServiceProviderProps {
	userDetailsUrlPrefix: string
	groupDetailsUrlPrefix: string
	children: React.ReactNode
}

export const UserNavServiceProvider = ({
	userDetailsUrlPrefix,
	groupDetailsUrlPrefix,
	children
}: UserNavServiceProviderProps) => {
	const contextValue: UserNavServiceContextProps = {
		createGroupDetailsPath: (groupId) => {
			return `${groupDetailsUrlPrefix}${groupId}`
		},
		createUserDetailsPath: (userId) => {
			return `${userDetailsUrlPrefix}${userId}`
		}
	}

	return (
		<UserNavServiceContext.Provider value={contextValue}>
			{children}
		</UserNavServiceContext.Provider>
	)
}
