export interface ImmutabilityProps {
	user: {
		name: string
		age: number
	}

	setName: (newName: string) => unknown
}

export const Immutability = ({ user, setName }: ImmutabilityProps) => {
	const resetName = () => {
		setName("")
	}

	return (
		<div>
			<p>Name: {user.name}</p>
			<p>Age: {user.age}</p>
			<button onClick={resetName}>Reset name</button>
		</div>
	)
}
