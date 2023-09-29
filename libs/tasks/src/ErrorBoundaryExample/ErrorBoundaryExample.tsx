import { ErrorBoundary, ErrorElementProps } from "./ErrorBoundary"
import { Explode } from "./Explode"

const ErrorElement = ({ tryAgain }: ErrorElementProps) => {
	return (
		<p>
			It exploded!<button onClick={tryAgain}>Try again</button>
		</p>
	)
}

export const ErrorBoundaryExample = () => {
	return (
		<ErrorBoundary errorElement={ErrorElement}>
			<Explode />
		</ErrorBoundary>
	)
}
