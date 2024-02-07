import { createContext, useContext, useEffect, useState } from "react"

export interface FieldsServiceContextProps {
	isDisabled: boolean
	setIsDisabled: (isDisabled?: boolean) => unknown
}

const FieldsServiceContext = createContext<FieldsServiceContextProps | undefined>(undefined)
FieldsServiceContext.displayName = "FieldsServiceContext"

export const useFieldsService = () => {
	const context = useContext(FieldsServiceContext)
	if (!context) throw new Error("FieldsService must be provided before use")
	return context
}
export const useFieldsServiceIsDisabled = () => {
	const context = useContext(FieldsServiceContext)
	return context?.isDisabled ?? false
}

export interface ProvideFieldsServiceProps {
	isDisabled?: boolean
	children: React.ReactNode
}

export const ProvideFieldsService = ({
	isDisabled: providedIsDisabled = false,
	children
}: ProvideFieldsServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(providedIsDisabled)
	useEffect(() => {
		setIsDisabled(providedIsDisabled)
	}, [providedIsDisabled])

	const toggleOrSetIsDisabled = (nextIsDisabled?: boolean) => {
		setIsDisabled(nextIsDisabled ?? !isDisabled)
	}

	const value = { isDisabled, setIsDisabled: toggleOrSetIsDisabled }
	return <FieldsServiceContext.Provider value={value}>{children}</FieldsServiceContext.Provider>
}
