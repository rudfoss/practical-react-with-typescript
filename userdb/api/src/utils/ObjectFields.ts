import { ConditionalExcept } from "type-fest"

/**
 * Type-helper that extracts non-function properties from an object.
 */
export type ObjectFields<TObject extends object> = ConditionalExcept<
	TObject,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	Function
>
