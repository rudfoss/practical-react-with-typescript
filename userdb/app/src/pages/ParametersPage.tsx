import { useParams } from "react-router-dom"

export const ParametersPage = () => {
	const parameters = useParams<"groupId">()

	return (
		<pre>
			<code>{JSON.stringify(parameters, undefined, 2)}</code>
		</pre>
	)
}
