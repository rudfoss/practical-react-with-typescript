import { createContext, useContext, useMemo, useState } from "react"

interface FieldDisablingServiceContextProps {
	isDisabled: boolean
	setIsDisabled: (newIsDisabled: boolean) => unknown
}

const FieldDisablingServiceContext = createContext<FieldDisablingServiceContextProps>({
	isDisabled: false,
	setIsDisabled: () => ""
})
FieldDisablingServiceContext.displayName = "FieldDisablingServiceContext"

export const useFieldDisablingService = () => useContext(FieldDisablingServiceContext)

export interface ProvideFieldDisablingServiceProps {
	children: React.ReactNode
}

export const ProvideFieldDisablingService = ({ children }: ProvideFieldDisablingServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(false)

	const value = useMemo((): FieldDisablingServiceContextProps => {
		return { isDisabled, setIsDisabled }
	}, [isDisabled])

	return (
		<FieldDisablingServiceContext.Provider value={value}>
			{children}
		</FieldDisablingServiceContext.Provider>
	)
}
