import { useEffect, useRef } from "react"

export const useWindowTitle = (title: string) => {
	const oldTitle = useRef(document.title)

	useEffect(() => {
		document.title = title
		const oldTitleRef = oldTitle.current
		return () => {
			document.title = oldTitleRef
		}
	}, [title])
}
