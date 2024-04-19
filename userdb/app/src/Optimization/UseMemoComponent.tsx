import { useMemo, useState } from "react"

import { TextField } from "@react-workshop/fields"
import { naiveFibonacci } from "@react-workshop/utils"

export interface NaiveComponentProps {
	slowness: number
}

export const NaiveComponent = ({ slowness }: NaiveComponentProps) => {
	const [value, setValue] = useState("")

	const fibbonacciNumber = useMemo(() => {
		const name = `NaiveComponent: ${slowness}`
		console.time(name)
		const nextFibbonacciNumber = naiveFibonacci(slowness)
		console.timeEnd(name)
		return nextFibbonacciNumber
	}, [slowness])

	return (
		<div>
			<TextField label="t" value={value} onChange={setValue} />
			Fibbonacci number {slowness}: {fibbonacciNumber}
		</div>
	)
}
