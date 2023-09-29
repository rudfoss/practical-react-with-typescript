import { ErrorBoundaryExample, useWindowTitle } from "@prwt/tasks"

export const TestErrorBoundaryPage = () => {
	useWindowTitle("Test Error Boundary")
	return <ErrorBoundaryExample />
}
