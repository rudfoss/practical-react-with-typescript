import { ReactNode, createContext, useContext, useState } from "react"

export interface HeaderServiceContextProps {
	headerText: string
	setHeaderText: (newHeaderText: string) => unknown
}

const HeaderServiceContext = createContext<HeaderServiceContextProps | undefined>(undefined)
HeaderServiceContext.displayName = "HeaderService"

export const useHeaderService = () => {
	const context = useContext(HeaderServiceContext)
	if (!context) throw new Error("You need to provide HeaderService before it can be used!")
	return context
}

export interface ProvideHeaderServiceProps {
	children: ReactNode
}

export const ProvideHeaderService = ({ children }: ProvideHeaderServiceProps) => {
	const [headerText, setHeaderText] = useState("")

	return (
		<HeaderServiceContext.Provider value={{ headerText, setHeaderText }}>
			{children}
		</HeaderServiceContext.Provider>
	)
}
