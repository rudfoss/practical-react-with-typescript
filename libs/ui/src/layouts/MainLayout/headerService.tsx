import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from "react"

export interface HeaderServiceContextProps {
	header: string
	setHeader: (newHeader: string) => unknown
}

const HeaderServiceContext = createContext<
	HeaderServiceContextProps | undefined
>(undefined)
HeaderServiceContext.displayName = "HeaderServiceContext"

export const useHeaderService = () => {
	const context = useContext(HeaderServiceContext)
	if (!context) throw new Error("HeaderService must be provided before use")
	return context
}
export const useHeader = (header: string) => {
	const { setHeader } = useHeaderService()
	useEffect(() => {
		setHeader(header)
	}, [setHeader, header])
}

export interface ProvideHeaderServiceProps {
	children: ReactNode
}

export const ProvideHeaderService = ({
	children
}: ProvideHeaderServiceProps) => {
	const [header, setHeader] = useState("")
	const value: HeaderServiceContextProps = {
		header,
		setHeader
	}
	return (
		<HeaderServiceContext.Provider value={value}>
			{children}
		</HeaderServiceContext.Provider>
	)
}
