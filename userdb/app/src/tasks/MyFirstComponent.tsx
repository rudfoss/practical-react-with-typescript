export interface MyFirstComponentProps {
	strong?: boolean
	children: string
}

export const MyFirstComponent = (props: MyFirstComponentProps) => {
	if (props.strong) {
		return (
			<p>
				<strong>{props.children}</strong>
			</p>
		)
	}

	return <p>{props.children}</p>
}
