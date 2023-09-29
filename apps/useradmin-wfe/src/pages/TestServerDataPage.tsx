import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { useHealthData } from "@prwt/tasks"

interface HealthData {
	ok: boolean
	bootTime: string
	upTime: string
}

const getFromServer = async () => {
	const response = await fetch("http://localhost:4210/health")
	const data = await response.json()
	await new Promise((resolve) => setTimeout(() => resolve(data), 5000))
	return data
}

export const TestServerDataPage = () => {
	const { data, isFetching, error } = useHealthData()

	if (error) {
		console.error({ error })
		return <p>Something did not go right</p>
	}

	if (isFetching) {
		return <p>Loading...</p>
	}

	return <p>Server has been running for {data.upTime}</p>
}
