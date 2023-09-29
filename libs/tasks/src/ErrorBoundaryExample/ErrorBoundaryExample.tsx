import { ErrorBoundary } from "./ErrorBoundary"
import { Explode } from "./Explode"

export const ErrorBoundaryExample = () => {
	return (
		<ErrorBoundary>
			<Explode />
		</ErrorBoundary>
	)
}
