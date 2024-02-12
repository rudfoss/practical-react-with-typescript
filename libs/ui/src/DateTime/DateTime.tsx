import { useMemo } from "react"

export interface DateTimeProps {
	dateTime: Date | number
}

export const DateTime = ({ dateTime }: DateTimeProps) => {
	const friendlyDate = useMemo(() => {
		if (typeof dateTime === "number") {
			return new Date(dateTime).toLocaleString()
		}

		return dateTime.toLocaleString()
	}, [dateTime])

	return <span>{friendlyDate}</span>
}
