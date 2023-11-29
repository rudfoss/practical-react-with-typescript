import { useState } from "react"

export interface ClickUntilProps {
	limit?: number
	message?: string
	bypassLimit?: boolean
}

export const ClickUntil = ({
	limit = 10,
	message = "Limit reached",
	bypassLimit = false
}: ClickUntilProps) => {
	const [count, setCount] = useState(0)
	const isLimitReached = count >= limit

	const increment = () => {
		setCount(count + 1)
	}
	const reset = () => {
		setCount(0)
	}

	return (
		<>
			<button onClick={increment} disabled={isLimitReached && !bypassLimit}>
				Click me!
			</button>
			<p>{isLimitReached ? message : count}</p>
			{isLimitReached && <button onClick={reset}>Reset</button>}
		</>
	)
}
