import { useQuery } from "@tanstack/react-query"

const getHealth = async () => {
	const response = await fetch("http://localhost:4000/health")
	return await response.json()
}

export const useHealthQuery = () => {
	return useQuery({
		queryKey: ["health"],
		queryFn: getHealth,
		staleTime: 1000 * 15
	})
}
