import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react"

export interface FieldsServiceContextProps {
	isDisabled: boolean
	toggleDisabled: () => unknown
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

	const toggleDisabled = useCallback(() => {
		setIsDisabled((oldIsDisabled) => !oldIsDisabled)
	}, [])

	const value = useMemo((): FieldsServiceContextProps => {
		return { isDisabled, toggleDisabled }
	}, [isDisabled, toggleDisabled])

	return (
		<FieldsServiceContext.Provider value={value}>
			{children}
		</FieldsServiceContext.Provider>
	)
}
