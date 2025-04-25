import { ReactNode, createContext, useContext, useState } from "react"

interface LoggedInContextProps {
	username: string
	setUsername: (newUsername: string) => unknown
}

export const loggedInContext = createContext<LoggedInContextProps | undefined>(
	undefined
)
loggedInContext.displayName = "loggedInContext"

export const useLoggedInContext = () => {
	const context = useContext(loggedInContext)
	if (!context)
		throw new Error("The loggedInContext must be provided before it is used")
	return context
}

export interface LoggedInProviderProps {
	children: ReactNode
}

export const LoggedInProvider = ({ children }: LoggedInProviderProps) => {
	const [username, setUsername] = useState("")
	const contextValue: LoggedInContextProps = {
		username,
		setUsername
	}

	return (
		<loggedInContext.Provider value={contextValue}>
			{children}
		</loggedInContext.Provider>
	)
}
