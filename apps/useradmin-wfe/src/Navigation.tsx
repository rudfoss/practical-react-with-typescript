import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

import { useFieldStateService } from "@prwt/fields"

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
	const { isDisabled, setIsDisabled } = useFieldStateService()

	const toggleFieldsDisabled = () => {
		setIsDisabled(!isDisabled)
	}

	return (
		<nav>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/users">Users</StyledLink>
			<StyledLink to="/groups">Groups</StyledLink>
			<StyledLink to="/server-data-demo">Server data demo</StyledLink>
			<button onClick={toggleFieldsDisabled}>
				{isDisabled ? "Enable fields" : "Disable fields"}
			</button>
		</nav>
	)
}
