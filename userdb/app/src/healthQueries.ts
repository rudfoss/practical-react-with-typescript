import { useQuery } from "@tanstack/react-query"
import { ClientGetter } from "./clients/react"
import { AppControllerClient } from "./clients/ts"

export const useHealthQuery = (
	getClient: ClientGetter<AppControllerClient>
) => {
	return useQuery({
		queryKey: ["health"],
		queryFn: () => getClient().getHealth(),
		staleTime: 1000 * 30
	})
}

export const useStatsQuery = (getClient: ClientGetter<AppControllerClient>) => {
	return useQuery({
		queryKey: ["stats"],
		queryFn: () => getClient().getStats(),
		staleTime: 1000 * 30
	})
}
