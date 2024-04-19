import { useEffect } from "react"

import { useHeaderService } from "./HeaderService"

export const useHeading = (heading: string) => {
	const { setHeaderText } = useHeaderService()
	useEffect(() => {
		setHeaderText(heading)
	}, [heading, setHeaderText])
}
