export const UidGeneratorKey = Symbol("UidGenerator")

/**
 * Generates a new globally unique string
 */
export type UidGenerator = () => string
