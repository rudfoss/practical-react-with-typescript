import { ReactNode, createContext, useContext, useState } from "react"

export interface FieldsServiceContextProps {
	isDisabled: boolean
	toggleIsDisabled: (isDisabled?: boolean) => unknown
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
	children: ReactNode
}

export const ProvideFieldsService = ({ children }: ProvideFieldsServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(false)

	const toggleIsDisabled = (newIsDisabled?: boolean) => {
		if (newIsDisabled === undefined) {
			setIsDisabled(!isDisabled)
			return
		}

		setIsDisabled(newIsDisabled)
	}

	const value: FieldsServiceContextProps = {
		isDisabled,
		toggleIsDisabled
	}
	return <FieldsServiceContext.Provider value={value}>{children}</FieldsServiceContext.Provider>
}
