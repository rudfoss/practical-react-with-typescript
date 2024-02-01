import { ConditionalExcept } from "type-fest"

/**
 * Type-helper that extracts non-function properties from an object.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ObjectFields<TObject extends object> = ConditionalExcept<TObject, Function>
