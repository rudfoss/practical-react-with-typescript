import { ReactNode, createContext, useContext, useState } from "react"

export interface FieldsServiceContextProps {
	disabled: boolean
	toggleDisabled: (flag?: boolean) => unknown
}

const FieldsServiceContext = createContext<FieldsServiceContextProps | undefined>(undefined)
FieldsServiceContext.displayName = "FieldsServiceContext"

export const useFieldsService = () => {
	const context = useContext(FieldsServiceContext)
	if (!context) throw new Error("FieldsService must be provided before use")
	return context
}
export const useFieldsServiceDisabled = () => {
	const context = useContext(FieldsServiceContext)
	if (!context) return false
	return context.disabled
}

export interface ProvideFieldsServiceProps {
	children: ReactNode
}

export const ProvideFieldsService = ({ children }: ProvideFieldsServiceProps) => {
	const [disabled, setDisabled] = useState(false)
	const toggleDisabled = (flag?: boolean) => {
		setDisabled(flag ?? disabled)
	}

	const value: FieldsServiceContextProps = {
		disabled,
		toggleDisabled
	}
	return <FieldsServiceContext.Provider value={value}>{children}</FieldsServiceContext.Provider>
}
