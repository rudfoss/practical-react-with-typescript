import { useHealthData } from "@prwt/tasks"

export const HomePage = () => {
	const { data } = useHealthData()
	return <h1>Home page {data.upTime}</h1>
}
