/**
 * Helper for loading ESM modules in CJS because NestJs refuses to stay with the times: https://github.com/nestjs/nest/pull/8736
 * @param packageName
 * @returns
 */
export const esmLoader = async <T>(packageName: string) =>
	new Function(`return import('${packageName}')`)() as T

export const importNanoid = () => esmLoader<typeof import("nanoid")>("nanoid")
