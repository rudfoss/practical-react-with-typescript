/**
 * Very simple delay function that resolves with the data after a certian delay.
 * @param data
 * @param durationMs
 * @param fail (optional = false) If set will reject the promise with a proper error object after the delay instead of resolving
 * @returns
 */
export const delay = async <T>(data: T | Promise<T>, durationMs: number, fail = false) => {
	await new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			fail ? reject(new Error("Delay rejected")) : resolve()
		}, durationMs)
	})
	return await data
}
