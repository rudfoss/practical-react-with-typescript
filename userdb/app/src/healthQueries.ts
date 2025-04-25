import { useQuery } from "@tanstack/react-query"

const getter = async (what: string) => {
	const response = await fetch(`http://localhost:4000/${what}`)
	return await response.json()
}

export const useHealthQuery = () => {
	return useQuery({
		queryKey: ["health"],
		queryFn: () => getter("health"),
		staleTime: 1000 * 30
	})
}

export const useStatsQuery = () => {
	return useQuery({
		queryKey: ["stats"],
		queryFn: () => getter("stats"),
		staleTime: 1000 * 30
	})
}
