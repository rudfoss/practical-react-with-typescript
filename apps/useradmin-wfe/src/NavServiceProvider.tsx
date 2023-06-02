import { UserNavServiceProvider } from "@prwt/user"

export interface NavServiceProviderProps {
	children: React.ReactNode
}

export const NavServiceProvider = ({ children }: NavServiceProviderProps) => {
	return (
		<UserNavServiceProvider
			userDetailsUrlPrefix="/users/"
			groupDetailsUrlPrefix="/groups/"
		>
			{children}
		</UserNavServiceProvider>
	)
}
