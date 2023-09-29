import { useEffect, useState } from "react"

export const useThrowIfNetworkUnavailable = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine)

	useEffect(() => {
		const offlineHandler = () => {
			setIsOnline(false)
		}
		window.addEventListener("offline", offlineHandler)
		return () => {
			window.removeEventListener("offline", offlineHandler)
		}
	}, [])

	if (!isOnline) {
		throw new Error("Offline!")
	}
}
