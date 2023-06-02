import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

const StyledLink = styled(NavLink)`
	display: block;
	text-decoration: none;
	color: inherit;
	margin-bottom: 8px;
	&.active {
		font-weight: bold;
		text-decoration: underline;
	}
`

export const Navigation = () => {
	return (
		<nav>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/users">Users</StyledLink>
			<StyledLink to="/groups">Groups</StyledLink>
		</nav>
	)
}
