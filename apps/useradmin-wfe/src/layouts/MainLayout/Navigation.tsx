import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

const Nav = styled.nav`
	padding: 16px;
	& > * {
		display: block;
	}
`

export const Navigation = () => {
	return (
		<Nav>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/fields">Fields</NavLink>
		</Nav>
	)
}
