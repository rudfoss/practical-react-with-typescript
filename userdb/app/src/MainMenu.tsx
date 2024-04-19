import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const MyLink = styled(Link)`
	display: block;
`

export const MainMenu = () => (
	<>
		<MyLink to="/">Home</MyLink>
		<MyLink to="/login">Login</MyLink>
		<MyLink to="/groups">Groups</MyLink>
		<MyLink to="/optimize">Optimization</MyLink>
		<MyLink to="/stats">Stats</MyLink>
		<MyLink to="/health">Health</MyLink>
		<MyLink to="/users/65c95de7-e917-4000-a57b-905527d46746">A user</MyLink>
	</>
)
