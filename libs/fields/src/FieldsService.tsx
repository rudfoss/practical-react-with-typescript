import { createContext, useContext, useMemo, useState } from "react"

export interface FieldsServiceContextProps {
	isDisabled: boolean
	setIsDisabled: (flag: boolean) => unknown
}

const FieldsServiceContext = createContext<
	FieldsServiceContextProps | undefined
>(undefined)
FieldsServiceContext.displayName = "FieldsServiceContext"

export const useFieldsService = () => {
	const ctx = useContext(FieldsServiceContext)
	if (!ctx) throw new Error("FieldsService must be provided before use")
	return ctx
}

export interface ProvideFieldsServiceProps {
	children: React.ReactNode
}

export const ProvideFieldsService = ({
	children
}: ProvideFieldsServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(false)

	const value = useMemo((): FieldsServiceContextProps => {
		return { isDisabled, setIsDisabled }
	}, [isDisabled])

	return (
		<FieldsServiceContext.Provider value={value}>
			{children}
		</FieldsServiceContext.Provider>
	)
}
