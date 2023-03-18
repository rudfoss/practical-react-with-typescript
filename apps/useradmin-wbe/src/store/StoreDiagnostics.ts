import { StoreDiagnosticsData } from "./models"

export const StoreDiagnostics_Token = Symbol("StoreDiagnostics")

export interface StoreDiagnostics {
	getStoreDiagnostics(): Promise<StoreDiagnosticsData>
}
