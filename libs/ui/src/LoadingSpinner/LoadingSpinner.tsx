import spinner from "./netscape-loader.gif"

export interface LoadingSpinnerProps {
	size?: number
}

export const LoadingSpinner = ({ size = 32 }: LoadingSpinnerProps) => {
	return <img alt="Loading spinner" src={spinner} width={32} height={32} />
}
