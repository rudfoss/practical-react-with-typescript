import React, { useState } from "react"

export const TextField = () => {
	const [inputValue, setInputValue] = useState("")

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		console.log("input changed", evt.target.value)
		setInputValue(evt.target.value)
	}

	return (
		<>
			<label htmlFor="text-field">Text field</label>
			<input id="text-field" type="text" onChange={onInputChange} />
			<p>{inputValue}</p>
		</>
	)
}
