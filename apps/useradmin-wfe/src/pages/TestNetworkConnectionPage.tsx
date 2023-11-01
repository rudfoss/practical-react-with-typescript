import { ErrorBoundary, useThrowIfNetworkUnavailable } from "@prwt/tasks"

const IfNoNetworkError = () => {
	return <p>No network</p>
}

const ExplodeIfNoNetwork = () => {
	useThrowIfNetworkUnavailable()
	return <p>Online</p>
}

export const TestNetworkConnectionPage = () => {
	return (
		<>
			<h1>Test network connection</h1>
			<ErrorBoundary errorElement={IfNoNetworkError}>
				<ExplodeIfNoNetwork />
			</ErrorBoundary>
		</>
	)
}
