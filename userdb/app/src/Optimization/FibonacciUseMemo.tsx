import { useMemo } from "react"

import { naiveFibonacci } from "@react-workshop/utils"

export interface FibonacciProps {
	fibonacciNumber: number
}

/**
 * A memoized version of the Fibonacci component that uses `useMemo()` to only recompute the fibonacci number if that specific prop changes.
 * @returns
 */
export const FibonacciUseMemo = ({ fibonacciNumber }: FibonacciProps) => {
	const name = `${fibonacciNumber}: useMemo() render`

	console.time(name)
	const fibNumber = useMemo(() => naiveFibonacci(fibonacciNumber), [fibonacciNumber])
	console.timeEnd(name)

	return (
		<div>
			Computed {fibonacciNumber}: {fibNumber}
		</div>
	)
}
