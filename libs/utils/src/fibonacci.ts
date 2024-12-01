/**
 * Naively compute a fibonacci number recursively
 * @param computeTo
 * @returns
 */
export const naiveFibonacci = (computeTo: number): number => {
  if (computeTo === 0) return 0
  if (computeTo === 1) return 1
  return naiveFibonacci(computeTo - 1) + naiveFibonacci(computeTo - 2)
}

const cache = [0, 1, 1]
export const memoizedFibonacci = (computeTo: number): number => {
  if (cache[computeTo] !== undefined) return cache[computeTo]
  cache[computeTo] =
    memoizedFibonacci(computeTo - 1) + memoizedFibonacci(computeTo - 2)
  return cache[computeTo]
}
