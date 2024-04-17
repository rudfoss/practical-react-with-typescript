import { useState } from "react"

import { CheckboxField } from "./CheckboxField"
import { Header } from "./Header"
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

export const App = () => {
	const [headerValue, setHeaderValue] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div>
			<TextField value={headerValue} onChange={setHeaderValue} label="Enter heading" />
			<PasswordField
				showPassword={showPassword}
				value={headerValue}
				label="Password again"
				onChange={setHeaderValue}
			/>
			<CheckboxField label="Show password" value={showPassword} onChange={setShowPassword} />
			<Header>{headerValue}</Header>
		</div>
	)
}

// <h1>
// 	👋 Hello there
// 	<MyComponent greeting="Good morning" suffix="!" padWithWhitespaces={4} />
// 	{/* React.createElement(MyComponent, {greeting: "Good morning", suffix:"!", padWithWhitespaces: 4, hideSuffix: true }) */}
// </h1>
