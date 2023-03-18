import { useState } from "react"

export interface ClickUntilProps {
	limit: number
	children: React.ReactNode
}

export const ClickUntil = ({ limit, children }: ClickUntilProps) => {
	const [count, setCount] = useState(0)
	const isAtLimit = count >= limit

	const increment = () => {
		setCount((current) => current + 1)
	}

	return (
		<div>
			<button disabled={isAtLimit} onClick={increment}>
				Click me
			</button>
			{isAtLimit ? children : <p>You have clicked the button {count}</p>}
		</div>
	)
}
