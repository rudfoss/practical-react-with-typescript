import styled from "@emotion/styled"
import { ReactNode } from "react"

interface StyledH1Props {
	emphasize?: boolean
}
const StyledH1 = styled.h1<StyledH1Props>`
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
		sans-serif;
	border: 3px solid #000;
	border-radius: 5px;
`

export interface HeaderProps {
	emphasize?: boolean
	children: ReactNode
}

export const Header = ({ emphasize, children }: HeaderProps) => (
	<StyledH1 emphasize={emphasize}>{children}</StyledH1>
)
