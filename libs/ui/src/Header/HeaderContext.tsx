import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"

export interface HeaderContextContextProps {
	heading: string
	setHeading: (newHeading: string) => unknown
}

const HeaderContextContext = createContext<HeaderContextContextProps | undefined>(undefined)
HeaderContextContext.displayName = "HeaderContextContext"

export const useHeaderContext = () => {
	const context = useContext(HeaderContextContext)
	if (!context) throw new Error("HeaderContext must be provided before use")
	return context
}
export const useHeading = (heading: string) => {
	const { setHeading } = useHeaderContext()
	useEffect(() => {
		setHeading(heading)
	}, [heading, setHeading])
}

export interface ProvideHeaderContextProps {
	children: ReactNode
}

export const ProvideHeaderContext = ({ children }: ProvideHeaderContextProps) => {
	const [heading, setHeading] = useState("")
	const value = useMemo((): HeaderContextContextProps => ({ heading, setHeading }), [heading])
	return <HeaderContextContext.Provider value={value}>{children}</HeaderContextContext.Provider>
}
