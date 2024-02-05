import styled from "@emotion/styled"

const StyledHeader = styled.header`
	border-bottom: 1px solid #000;
	padding: 8px;
	margin-bottom: 8px;
`
const H1 = styled.h1`
	margin: 0;
`

export interface HeaderProps {
	children: string
}

export function Header({ children }: HeaderProps) {
	return (
		<StyledHeader>
			<H1>{children}</H1>
		</StyledHeader>
	)
}
