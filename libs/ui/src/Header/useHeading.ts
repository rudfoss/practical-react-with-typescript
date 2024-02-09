import { useEffect } from "react"

import { useHeaderService } from "./headerService"

/**
 * Sets the heading in the header.
 * @param heading
 */
export const useHeading = (heading: string) => {
	const { setHeading } = useHeaderService()
	useEffect(() => {
		setHeading(heading)
	}, [heading, setHeading])
}
