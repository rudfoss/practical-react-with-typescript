import { createContext, useContext, useState } from "react"

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
	defaultIsDisabled?: boolean
	children: React.ReactNode
}

export const ProvideFieldsService = ({
	defaultIsDisabled = false,
	children
}: ProvideFieldsServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(defaultIsDisabled)
	const toggleOrSetIsDisabled = (nextIsDisabled?: boolean) => {
		setIsDisabled(nextIsDisabled ?? !isDisabled)
	}

	const value = { isDisabled, setIsDisabled: toggleOrSetIsDisabled }
	return <FieldsServiceContext.Provider value={value}>{children}</FieldsServiceContext.Provider>
}
