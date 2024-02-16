import { Link } from "react-router-dom"

import { useHeading } from "@react-workshop/ui"

import { FieldsShowcase } from "../FieldsShowcase"

export const FieldsPage = () => {
	useHeading("Fields page")

	return (
		<>
			<Link to="/">Home</Link>
			<FieldsShowcase />
		</>
	)
}
