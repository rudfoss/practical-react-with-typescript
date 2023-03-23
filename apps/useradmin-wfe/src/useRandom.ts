import { useMemo } from "react"

export const useRandom = (seed: string) => {
	return useMemo(() => {
		return Math.random()
		// A new random value should be produced every time seed changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seed])
}
