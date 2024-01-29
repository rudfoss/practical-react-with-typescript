import { ConditionalExcept } from "type-fest"

/**
 * Merges data into an object or class instance. The object is modified in-place.
 *
 * @example
 * merge(new DataClass(), { a: true, b: 42 })
 *
 * @example
 * const base = { a: false, b: 0, c: "hey" }
 * merge(base, { a: true, b: 42 })
 *
 * @param into
 * @param data
 */
export const merge = <TInst extends object>(
	into: TInst,
	// eslint-disable-next-line @typescript-eslint/ban-types
	data: Partial<ConditionalExcept<TInst, Function>>
) => {
	for (const [key, value] of Object.entries(data)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		;(into as any)[key] = value
	}
	return into
}
