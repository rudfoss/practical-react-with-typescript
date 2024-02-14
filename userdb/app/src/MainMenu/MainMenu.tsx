import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

import { RequireRoles } from "@react-workshop/userdb-libs-auth"

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
		<hr />
		<StyledNavLink to="/login/basic">Basic Login</StyledNavLink>
		<StyledNavLink to="/login/data-service">Data Service Login</StyledNavLink>
		<StyledNavLink to="/login/auth-service">Auth Service Login</StyledNavLink>
		<RequireRoles>
			<hr />
			<RequireRoles roles={["User", "UserAdmin"]}>
				<StyledNavLink to="/users">Users</StyledNavLink>
				<StyledNavLink to="/groups">Groups</StyledNavLink>
				<hr />
				<StyledNavLink to="/users-static" end>
					Static Users
				</StyledNavLink>
				<StyledNavLink to="/users-static/67dc12eb-81dc-4a4a-9fe0-12cee1d11674">
					Single static user
				</StyledNavLink>
				<StyledNavLink to="/groups-static">Static groups</StyledNavLink>
			</RequireRoles>
		</RequireRoles>
		<RequireRoles roles={["Admin"]}>
			<hr />
			<StyledNavLink to="/status">API Status</StyledNavLink>
			<StyledNavLink to="/sessions">User sessions</StyledNavLink>
		</RequireRoles>
		<hr />
		<StyledNavLink to="/optimization">Optimization</StyledNavLink>
		<StyledNavLink to="/non-existent-page">404</StyledNavLink>
		<StyledNavLink to="/fields">Fields</StyledNavLink>
	</>
)
