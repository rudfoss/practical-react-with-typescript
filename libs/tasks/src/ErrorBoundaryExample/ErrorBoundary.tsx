import { ErrorInfo, PureComponent, ReactNode } from "react"

interface ErrorBoundaryProps {
	children: ReactNode
}
interface ErrorBoundaryState {
	hasError: boolean
	error?: unknown
}

export class ErrorBoundary extends PureComponent<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	public constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	public static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
		return { hasError: true, error }
	}

	public componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
		console.error({ error, errorInfo })
	}

	public tryAgain = () => {
		this.setState({
			hasError: false,
			error: undefined
		})
	}

	public render() {
		if (this.state.hasError) {
			return (
				<p>
					An error has occurred{" "}
					<button onClick={this.tryAgain}>try again?</button>
				</p>
			)
		}

		return this.props.children
	}
}
