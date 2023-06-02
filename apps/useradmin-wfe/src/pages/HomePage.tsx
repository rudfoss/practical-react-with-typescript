import { useRandom } from "@prwt/utils"

export const HomePage = () => {
	const randomNumber = useRandom("foo")

	return (
		<>
			<h1>User administration</h1>
			<p>Welcome user number: {randomNumber}</p>
		</>
	)
}
