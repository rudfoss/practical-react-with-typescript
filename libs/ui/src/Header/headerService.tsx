import { createContext, useContext, useMemo, useState } from "react"

export interface HeaderServiceContextProps {
	heading: string
	setHeading: (newHeading: string) => unknown
}

const HeaderServiceContext = createContext<HeaderServiceContextProps | undefined>(undefined)
HeaderServiceContext.displayName = "HeaderServiceContext"

export const useHeaderService = () => {
	const context = useContext(HeaderServiceContext)
	if (!context) throw new Error("HeaderService must be provided before use")
	return context
}

export interface ProvideHeaderServiceProps {
	initialHeading?: string
	children: React.ReactNode
}

export const ProvideHeaderService = ({
	initialHeading = "User Database",
	children
}: ProvideHeaderServiceProps) => {
	const [heading, setHeading] = useState(initialHeading)

	const value = useMemo((): HeaderServiceContextProps => {
		return { heading, setHeading }
	}, [heading])
	return <HeaderServiceContext.Provider value={value}>{children}</HeaderServiceContext.Provider>
}
