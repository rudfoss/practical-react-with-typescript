import { useState } from "react"

import { ChoiceField, ChoiceFieldChoice, TextField } from "@react-workshop/fields"

import { Fibonacci, MemoFibonacci } from "./Fibonacci"
import { FibonacciUseMemo } from "./FibonacciUseMemo"

type Mode = "naive" | "memoized" | "useMemo"
type ModeChoice = ChoiceFieldChoice<Mode>
const modes: ModeChoice[] = [
	{
		data: "naive",
		label: "No optimization (everything re-renders every time)",
		value: "naive"
	},
	{
		data: "memoized",
		label: "Use memoized component that only re-renders if its props have changed.",
		value: "memoized"
	},
	{
		data: "useMemo",
		label:
			"Use useMemo inside the component so that the fibonacci number is only recomputed if that specific prop is changed.",
		value: "useMemo"
	}
]

export const Optimization = () => {
	const [fibonacciNumber, setFibonacciNumber] = useState(0)
	const [modeChoice, setModeChoice] = useState(modes[0])
	const [text, setText] = useState("")

	const mode = modeChoice.data

	return (
		<>
			<div>
				<input
					type="range"
					min={0}
					max={42}
					value={fibonacciNumber}
					onChange={(event) => setFibonacciNumber(event.currentTarget.valueAsNumber)}
				/>
				<span>Fibbonacci number {fibonacciNumber}</span>
			</div>
			<ChoiceField
				label="Optimization mode"
				variant="radio"
				value={modeChoice}
				options={modes}
				onChange={(newValue) => setModeChoice(newValue ?? modes[0])}
			></ChoiceField>
			<hr />
			<TextField label="Write some text here to trigger rerender" value={text} onChange={setText} />
			<hr />
			{mode === "naive" && <Fibonacci fibonacciNumber={fibonacciNumber} />}
			{mode === "memoized" && <MemoFibonacci fibonacciNumber={fibonacciNumber} />}
			{mode === "useMemo" && <FibonacciUseMemo fibonacciNumber={fibonacciNumber} />}
		</>
	)
}
