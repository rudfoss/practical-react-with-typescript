import { useQuery } from "@tanstack/react-query"

const getFromServer = async () => {
	const response = await fetch("http://localhost:4210/health")
	const data = await response.json()
	await new Promise((resolve) => setTimeout(() => resolve(data), 1000))
	return data
}

export const useHealthData = () => {
	return useQuery({
		queryKey: ["health"],
		queryFn: getFromServer
	})
}
