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

export const App = () => (
	<h1>
		👋 Hello there
		<MyComponent greeting="Good morning" suffix="!" padWithWhitespaces={4} hideSuffix />
		{/* React.createElement(MyComponent, {greeting: "Good morning", suffix:"!" }) */}
	</h1>
)
