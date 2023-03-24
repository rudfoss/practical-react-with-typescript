import { createContext, useContext, useState } from "react"

import { User, usersStatic } from "@prt/data"

export interface UserServiceContextProps {
	user: User
	userIndex: number
	changeUserIndex: (newIndex: number) => unknown
}

const UserServiceContext = createContext<UserServiceContextProps | undefined>(undefined)
UserServiceContext.displayName = "UserServiceContext"

export const useUserService = () => {
	const ctx = useContext(UserServiceContext)
	if (!ctx) {
		throw new Error("You must provide UserServiceContext before it can be used")
	}
	return ctx
}

export interface ProvideUserServiceProps {
	children: React.ReactNode
}

export const ProvideUserService = ({ children }: ProvideUserServiceProps) => {
	const [userIndex, setUserIndex] = useState(0)

	return (
		<UserServiceContext.Provider
			value={{ user: usersStatic[userIndex], userIndex, changeUserIndex: setUserIndex }}
		>
			{children}
		</UserServiceContext.Provider>
	)
}
