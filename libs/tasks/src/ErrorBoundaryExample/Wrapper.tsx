import { ErrorBoundary } from "./ErrorBoundary"
import { ErrorBoundaryExample } from "./ErrorBoundaryExample"

export const Wrapper = () => {
	return (
		<ErrorBoundary>
			<ErrorBoundaryExample />
		</ErrorBoundary>
	)
}
