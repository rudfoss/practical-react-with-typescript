import { ReactNode, useState } from "react"

export interface ClickUntilProps {
	/**
	 * The max number of clicks allowed before the button is disabled.
	 */
	limit: number
	/**
	 * The chilren are visible once the limit has been reached.
	 */
	children: ReactNode
}

/**
 * Allows clicking on a button until a configured limit is reached.
 * @param props
 * @returns
 */
export const ClickUntil = ({ limit, children }: ClickUntilProps) => {
	const [count, setCount] = useState(0)
	const isCountAtOrAboveLimit = count >= limit

	const incrementCount = () => {
		setCount(count + 1)
	}
	const resetCount = () => {
		setCount(0)
	}

	return (
		<div>
			<button onClick={incrementCount} disabled={isCountAtOrAboveLimit}>
				Click me
			</button>
			<button onClick={resetCount}>Reset</button>
			{isCountAtOrAboveLimit ? (
				children
			) : (
				<p>You have clicked {count} time(s)</p>
			)}
		</div>
	)
}
