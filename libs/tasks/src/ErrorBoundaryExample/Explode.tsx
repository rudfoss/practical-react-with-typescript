import { useState } from "react"

export const Explode = () => {
	const [throwError, setThrowError] = useState(false)

	if (throwError) {
		throw new Error("Boom!")
	}

	const explode = () => setThrowError(true)

	return <button onClick={explode}>Explode!</button>
}
