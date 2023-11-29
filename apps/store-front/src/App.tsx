import React from "react"

const MyComponentArrow = () => {
	return <strong>MyComponentArrow</strong>
}
const MyComponentPlain = () => {
	return React.createElement("strong", {}, "MyComponentPlain")
}

function MyComponent() {
	return <strong>MyComponent</strong>
}

const arr = [4, 2, 5, 7]
arr.filter((v) => v < 5)

export const App = () => {
	return (
		<h1>
			<span role="img" aria-label="Rocket">
				🚀
			</span>{" "}
			<MyComponentPlain />
		</h1>
	)
}
