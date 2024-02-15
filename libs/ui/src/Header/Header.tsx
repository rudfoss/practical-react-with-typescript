import styled from "@emotion/styled"

const H1 = styled.h1`
	font-weight: bold;
	font-family: monospace;
	color: hotpink;
`

export interface HeaderProps {
	children: string
}

export const Header = ({ children }: HeaderProps) => <H1>{children}</H1>
