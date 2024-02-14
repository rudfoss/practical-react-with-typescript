import styled from "@emotion/styled"

import spinner from "./netscape-loader.gif"

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		display: block;
		flex: 0 0 auto;
	}
`

export interface LoadingSpinnerProps {
	size?: number
}

export const LoadingSpinner = ({ size = 64 }: LoadingSpinnerProps) => (
	<Container>
		<img alt="Loading spinner" src={spinner} width={size} height={size} />
	</Container>
)
