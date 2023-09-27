import { useId, useState } from "react"

export const BooleanField = () => {
	const id = useId()
	const [checked, setChecked] = useState(false)

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(evt.target.checked)
	}

	return (
		<div>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={onInputChange}
			/>
			<label htmlFor={id}>Check the box</label>
			{checked && (
				<span role="img" aria-label="Flag indicating the box is checked">
					🚩
				</span>
			)}
		</div>
	)
}
