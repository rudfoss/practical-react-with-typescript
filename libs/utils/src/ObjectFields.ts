import { ConditionalExcept } from "type-fest"

/**
 * Type-helper that extracts non-function properties from an object.
 */
export type ObjectFields<TObject extends object> = ConditionalExcept<
  TObject,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  Function
>
