import { Link } from "react-router-dom"

import { useHeaderContext } from "@react-workshop/ui"

import { FieldsShowcase } from "../FieldsShowcase"

export const FieldsPage = () => {
	const { setHeading } = useHeaderContext()
	setHeading("Fields page")

	return (
		<>
			<Link to="/">Home</Link>
			<FieldsShowcase />
		</>
	)
}
