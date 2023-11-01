import { ChangeEvent } from "react"
import { Link } from "react-router-dom"

import { useFieldsService, useFieldsStore } from "@prwt/fields"

export const Nav = () => {
	const { isDisabled, setIsDisabled } = useFieldsService()
	// const { isDisabled, setIsDisabled } = useFieldsStore()

	const onDisableFieldsToggle = (evt: ChangeEvent<HTMLInputElement>) => {
		setIsDisabled(evt.target.checked)
	}

	return (
		<>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/users">Users</Link>
				<Link to="/test-error-boundary">Test error boundary</Link>
				<Link to="/test-network">Test network</Link>
				<Link to="/pick-user">Pick user</Link>
				<Link to="/test-server-data">Test Server Data</Link>
			</nav>
			<input
				type="checkbox"
				checked={isDisabled}
				onChange={onDisableFieldsToggle}
			/>
		</>
	)
}
