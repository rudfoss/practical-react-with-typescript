import { useMemo } from "react"

export const useRandom = (seed: unknown) => {
	return useMemo(() => {
		return Math.random()
		// We only need the random number to change when the seed changes, the actual value is not needed.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seed])
}
