import { useState } from "react"

export interface CountProps {
	/**
	 * When max is reached the button is disabled.
	 */
	max: number
}

export const Count = ({ max }: CountProps) => {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count + 1)
	}

	return (
		<button type="button" onClick={increment} disabled={count >= max}>
			Count up {count}
		</button>
	)
}
