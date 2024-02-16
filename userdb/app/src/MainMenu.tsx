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
		<StyledNavLink to="/stats">Stats</StyledNavLink>
		<StyledNavLink to="/health">Health</StyledNavLink>
		<StyledNavLink to="/naive-load-data">Naive Load Data</StyledNavLink>
		<StyledNavLink to="/fields">Fields</StyledNavLink>
		<StyledNavLink to="/groups" end>
			Static Groups
		</StyledNavLink>
	</>
)
