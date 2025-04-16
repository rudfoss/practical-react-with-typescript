/**
 * Helper for loading ESM modules in CJS-scenarios because NestJs refuses to stay with the times: https://github.com/nestjs/nest/pull/8736
 *
 * @example
 * export const importLow = () => esmLoader<typeof import("lowdb/node")>("lowdb/node")
 *
 * @param packageName
 * @returns
 */
export const esmLoader = async <T>(packageName: string) =>
	new Function(`return import('${packageName}')`)() as T
