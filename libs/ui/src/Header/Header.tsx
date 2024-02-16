import styled from "@emotion/styled"

import { useHeaderService } from "./headerService"

const Container = styled.div`
	border-bottom: 1px solid #000;
	padding: 8px;
	margin-bottom: 8px;

	&::selection {
		background-color: hotpink;
	}
`
const H1 = styled.h1`
	margin: 0;
`

export const Header = () => {
	const { heading } = useHeaderService()

	return (
		<Container>
			<H1>{heading}</H1>
		</Container>
	)
}
