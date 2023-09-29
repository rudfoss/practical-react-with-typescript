import { ReactNode, createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { User } from "@prwt/user-admin"

export interface NavContextProps {
	user?: User
	setUser: (newUser?: User) => void
	navigateToTheUser: () => void
}

const NavContext = createContext<NavContextProps | undefined>(undefined)
NavContext.displayName = "NavContext"

export const useNavService = () => {
	const ctx = useContext(NavContext)
	if (!ctx)
		throw new Error(`You need to provide NavService before you can use it!`)
	return ctx
}

export interface ProvideNavServiceProps {
	children: ReactNode
}

export const ProvideNavService = ({ children }: ProvideNavServiceProps) => {
	const navigate = useNavigate()
	const [user, setUser] = useState<User>()
	const navigateToTheUser = () => {
		navigate(`/users/${user?.id}`)
	}

	return (
		<NavContext.Provider value={{ user, setUser, navigateToTheUser }}>
			{children}
		</NavContext.Provider>
	)
}
