import styled from "@emotion/styled"
import { ReactNode } from "react"

const Container = styled.div`
	width: 40px;
	height: 40px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background-color: #8cffff;
	border-radius: 50%;
	text-transform: uppercase;
	margin: 0 4px;
`

export interface AvatarDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export const AvatarDisplay = ({ children, ...restProps }: AvatarDisplayProps) => {
	return <Container {...restProps}>{children}</Container>
}
