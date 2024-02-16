import styled from "@emotion/styled"

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

export interface HeaderProps {
	children: string
}

export const Header = ({ children }: HeaderProps) => (
	<Container>
		<H1>{children}</H1>
	</Container>
)
