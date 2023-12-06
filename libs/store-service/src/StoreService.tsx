import { createContext, useContext, useMemo } from "react"

import { AuthControllerClient } from "@prwt/generated/store-api"

export interface StoreServiceContextProps {
	authClient: AuthControllerClient
}

const StoreServiceContext = createContext<StoreServiceContextProps | undefined>(
	undefined
)
StoreServiceContext.displayName = "StoreServiceContext"

export const useStoreService = () => {
	const ctx = useContext(StoreServiceContext)
	if (!ctx) throw new Error("StoreService must be provided before use")
	return ctx
}

export interface ProvideStoreServiceProps {
	baseUrl: string
	children: React.ReactNode
}

export const ProvideStoreService = ({
	baseUrl,
	children
}: ProvideStoreServiceProps) => {
	const value = useMemo((): StoreServiceContextProps => {
		return {
			authClient: new AuthControllerClient(baseUrl)
		}
	}, [baseUrl])
	return (
		<StoreServiceContext.Provider value={value}>
			{children}
		</StoreServiceContext.Provider>
	)
}