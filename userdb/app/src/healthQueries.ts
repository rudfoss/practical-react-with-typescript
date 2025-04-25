import { ClientGetter } from "@prwt/userdb-api-spec/react"
import { AppControllerClient } from "@prwt/userdb-api-spec/ts"
import { useQuery } from "@tanstack/react-query"

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
