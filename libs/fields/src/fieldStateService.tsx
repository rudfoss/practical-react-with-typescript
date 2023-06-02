import { createContext, useContext, useState } from "react"

interface FieldStateServiceContextProps {
	isDisabled: boolean
	setIsDisabled: (isDisabled: boolean) => unknown
}

const FieldStateServiceContext = createContext<
	FieldStateServiceContextProps | undefined
>(undefined)
FieldStateServiceContext.displayName = "FieldStateServiceContext"

export const useFieldStateService = () => {
	const ctx = useContext(FieldStateServiceContext)
	if (!ctx) throw new Error("FieldStateService must be provided before use")
	return ctx
}

export interface ProvideFieldStateServiceProps {
	children: React.ReactNode
}

export const ProvideFieldStateService = ({
	children
}: ProvideFieldStateServiceProps) => {
	const [isDisabled, setIsDisabled] = useState(false)

	const value: FieldStateServiceContextProps = {
		isDisabled,
		setIsDisabled
	}

	return (
		<FieldStateServiceContext.Provider value={value}>
			{children}
		</FieldStateServiceContext.Provider>
	)
}
