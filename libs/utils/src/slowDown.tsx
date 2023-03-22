import { memo } from "react"

/**
 * Synchronously slows down the current thread by naively computing the fibonacci sequence up to the specified factor number.
 * @param factor
 */
export const slowDown = (factor: number): number => {
	if (factor <= 1) return 0
	if (factor === 2) return 1
	if (factor === 3) return 1
	return slowDown(factor - 1) + slowDown(factor - 2)
}

interface SlowDownProps {
	factor: number
}
export const SlowDown = ({ factor }: SlowDownProps) => {
	console.time("slowDownRenderTime")
	const result = slowDown(factor)
	console.timeEnd("slowDownRenderTime")
	return (
		<p>
			Slowing down {factor} {result}
		</p>
	)
}
export const SlowDownMemo = memo(SlowDown)
