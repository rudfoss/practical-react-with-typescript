import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react"

export interface AuthServiceContextProps {
	isAuthenticated: boolean
	username: string
	role: string

	login: () => unknown
	logout: () => unknown
}

const AuthServiceContext = createContext<AuthServiceContextProps | undefined>(
	undefined
)
AuthServiceContext.displayName = "AuthServiceContext"

export const useAuthService = () => {
	const ctx = useContext(AuthServiceContext)
	if (!ctx) throw new Error("AuthService must be provided before use")
	return ctx
}

export interface ProvideAuthServiceProps {
	children: React.ReactNode
}

export const ProvideAuthService = ({ children }: ProvideAuthServiceProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [username, setUsername] = useState("")
	const [role, setRole] = useState("")

	const login = useCallback(() => {
		setIsAuthenticated(true)
		setUsername("User")
		setRole("admin")
	}, [])
	const logout = useCallback(() => {
		setIsAuthenticated(false)
		setUsername("")
		setRole("")
	}, [])

	const value = useMemo((): AuthServiceContextProps => {
		return { isAuthenticated, username, role, login, logout }
	}, [isAuthenticated, role, username, login, logout])

	return (
		<AuthServiceContext.Provider value={value}>
			{children}
		</AuthServiceContext.Provider>
	)
}
