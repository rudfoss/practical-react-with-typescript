import { Link } from "react-router-dom"

export const MainMenu = () => {
	return (
		<>
			<Link to="/" style={{ display: "block" }}>
				Front page
			</Link>
			<Link to="/groups" style={{ display: "block" }}>
				Groups
			</Link>
			<Link
				to="/groups/716eabb3-5044-49f6-95c1-60efb5709143"
				style={{ display: "block" }}
			>
				A group
			</Link>
		</>
	)
}
