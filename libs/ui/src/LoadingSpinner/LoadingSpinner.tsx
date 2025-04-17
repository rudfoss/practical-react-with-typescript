import spinner from "./netscape-loader.gif"

import classes from "./LoadingSpinner.module.scss"

export interface LoadingSpinnerProps {
	size?: number
}

export const LoadingSpinner = ({ size = 64 }: LoadingSpinnerProps) => (
	<div className={classes.container}>
		<img alt="Loading spinner" src={spinner} width={size} height={size} />
	</div>
)
