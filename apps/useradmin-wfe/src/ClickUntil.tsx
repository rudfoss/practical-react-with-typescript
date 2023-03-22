import { useState } from "react"

export interface ClickUntilProps {
	limit: number
	limitMessage: string
}

export const ClickUntil = ({ limitMessage, limit }: ClickUntilProps) => {
	const [count, setCount] = useState(0)
	const isAtLimit = count >= limit

	const increment = () => {
		setCount(count + 1)
	}
	const reset = () => {
		setCount(0)
	}

	return (
		<>
			<button disabled={isAtLimit} onClick={increment}>
				Increment
			</button>
			<p>{isAtLimit ? limitMessage : `You've clicked: ${count} time(s)`}</p>
			<button onClick={reset}>Reset</button>
		</>
	)
}
