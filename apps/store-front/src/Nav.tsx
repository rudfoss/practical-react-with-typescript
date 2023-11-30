import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
	display: block;
`

export const Nav = () => {
	return (
		<>
			<StyledLink to="/products">Products</StyledLink>
			<StyledLink to="/products/00416e74-d54c-4715-856d-34ca61e581b9">
				A Product
			</StyledLink>
		</>
	)
}
