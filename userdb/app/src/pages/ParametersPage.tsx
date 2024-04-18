import { useParams } from "react-router-dom"

export const ParametersPage = () => {
	const foundParameters = useParams()

	return (
		<pre>
			<code>{JSON.stringify(foundParameters, undefined, 2)}</code>
		</pre>
	)
}
