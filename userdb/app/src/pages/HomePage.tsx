import { Link } from "react-router-dom"

import { CheckboxField, ProvideFieldsService, useFieldsService } from "@react-workshop/fields"
import { useHeading } from "@react-workshop/ui"

export const HomePage = () => {
	useHeading("Home page")
	return (
		<p>
			Click <Link to="/login">here</Link> to log in
		</p>
	)
}
