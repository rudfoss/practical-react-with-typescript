import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

const StyledLink = styled(NavLink)`
	display: block;
	&.active {
		font-weight: bold;
	}
`

export const Nav = () => {
	return (
		<>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/products" end>
				Products
			</StyledLink>
			<StyledLink to="/products/00416e74-d54c-4715-856d-34ca61e581b9">
				A Product
			</StyledLink>
		</>
	)
}
