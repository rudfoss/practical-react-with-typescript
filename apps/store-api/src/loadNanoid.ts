export const loadNanoid = async () =>
	(await eval('import("nanoid")')) as Promise<typeof import("nanoid")>
