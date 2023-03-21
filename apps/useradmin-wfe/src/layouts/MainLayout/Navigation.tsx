import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

const Nav = styled.nav`
	padding: 16px;
`

export const Navigation = () => {
	return (
		<Nav>
			<NavLink to="/">Home</NavLink>
		</Nav>
	)
}
