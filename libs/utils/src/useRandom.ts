import { useMemo } from "react"

export const useRandom = (mutator: string) => {
	return useMemo(() => {
		return Math.random() * 1000
		// The mutator updates the random number indirectly, must be included in deps array for this to work.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutator])
}
