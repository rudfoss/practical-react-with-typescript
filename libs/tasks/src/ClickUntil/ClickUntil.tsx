import { useState } from "react"

export interface ClickUntilProps {
	limit: number
	children: React.ReactNode
}

export const ClickUntil = ({ limit, children }: ClickUntilProps) => {
	const [count, setCount] = useState(0)
	const isBelowLimit = count < limit

	const increment = () => {
		setCount(count + 1)
	}
	const reset = () => {
		setCount(0)
	}

	return (
		<div>
			<button onClick={increment} disabled={!isBelowLimit}>
				Click me
			</button>
			{isBelowLimit ? <p>You have clicked {count} time(s)</p> : children}
			<button onClick={reset}>Reset</button>
		</div>
	)
}
