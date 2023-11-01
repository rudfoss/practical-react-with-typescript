import { ErrorInfo, PureComponent, ReactNode } from "react"

export interface ErrorElementProps {
	error: unknown
	tryAgain: () => void
}
interface ErrorBoundaryProps {
	errorElement: (props: ErrorElementProps) => JSX.Element
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
			const ErrorElement = this.props.errorElement
			return <ErrorElement error={this.state.error} tryAgain={this.tryAgain} />
		}

		return this.props.children
	}
}
