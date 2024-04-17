import { useState } from "react"

import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
import { ListDemo } from "./ListDemo"
import { LoginForm } from "./LoginForm"
import { PasswordField } from "./PasswordField"
import { TextField } from "./TextField"

interface MyComponentProps {
	greeting: string
	suffix: string
	padWithWhitespaces: number
	hideSuffix?: boolean
}

const MyComponent = (props: MyComponentProps) => (
	<h2>
		MyComponent: {props.greeting}
		{props.suffix}
	</h2>
)

export const App = () => <ListDemo />

// <h1>
// 	👋 Hello there
// 	<MyComponent greeting="Good morning" suffix="!" padWithWhitespaces={4} />
// 	{/* React.createElement(MyComponent, {greeting: "Good morning", suffix:"!", padWithWhitespaces: 4, hideSuffix: true }) */}
// </h1>
