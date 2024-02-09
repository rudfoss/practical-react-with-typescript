import { memo } from "react"

import { naiveFibonacci } from "@react-workshop/utils"

export interface FibonacciProps {
	fibonacciNumber: number
}

/**
 * Naive Fibonacci component that recursively recomputes the fibonacci number every time it renders.
 * @returns
 */
export const Fibonacci = ({ fibonacciNumber }: FibonacciProps) => {
	const name = `${fibonacciNumber}: render`

	console.time(name)
	const fibNumber = naiveFibonacci(fibonacciNumber)
	console.timeEnd(name)

	return (
		<div>
			Computed {fibonacciNumber}: {fibNumber}
		</div>
	)
}

/**
 * A memoized version of the Fibonacci component. The component function will only be called if any of the props it receives have changed.
 */
export const MemoFibonacci = memo(Fibonacci)
