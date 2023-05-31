import React, { useState } from "react"

export const TextField = () => {
	const [inputValue, setInputValue] = useState("")

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		console.log("input changed", evt.target.value)
		setInputValue(evt.target.value)
	}

	const clearField = () => {
		setInputValue("")
	}

	return (
		<>
			<label htmlFor="text-field">Text field</label>
			<input
				id="text-field"
				type="text"
				value={inputValue}
				onChange={onInputChange}
			/>
			<button onClick={clearField}>Clear</button>
			<p>{inputValue}</p>
		</>
	)
}
