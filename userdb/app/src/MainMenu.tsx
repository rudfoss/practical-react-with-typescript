import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

const StyledNavLink = styled(NavLink)`
	display: block;
	margin-bottom: 8px;
	text-decoration: none;

	&.active {
		font-weight: bold;
		text-decoration: underline;
	}
`

export const MainMenu = () => (
	<>
		<StyledNavLink to="/">Home</StyledNavLink>
		<StyledNavLink to="/fields">Fields</StyledNavLink>
		<StyledNavLink to="/groups" end>
			Static Groups
		</StyledNavLink>
		<StyledNavLink to="/groups/12b2f31a-a8e6-4e08-971c-a8594f16ab76">A Static Group</StyledNavLink>
	</>
)
