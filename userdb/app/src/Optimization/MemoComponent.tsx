import { memo, useState } from "react"

import { TextField } from "@react-workshop/fields"
import { naiveFibonacci } from "@react-workshop/utils"

export interface NaiveComponentProps {
	slowness: number
}

export const NaiveComponent = memo(({ slowness }: NaiveComponentProps) => {
	const [value, setValue] = useState("")
	const name = `NaiveComponent: ${slowness}`

	console.time(name)
	const fibbonacciNumber = naiveFibonacci(slowness)
	console.timeEnd(name)

	return (
		<div>
			<TextField label="t" value={value} onChange={setValue} />
			Fibbonacci number {slowness}: {fibbonacciNumber}
		</div>
	)
})
