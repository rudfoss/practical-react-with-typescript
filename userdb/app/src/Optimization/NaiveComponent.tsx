import { naiveFibonacci } from "@react-workshop/utils"

export interface NaiveComponentProps {
	slowness: number
}

export const NaiveComponent = ({ slowness }: NaiveComponentProps) => {
	const name = `NaiveComponent: ${slowness}`

	console.time(name)
	const fibbonacciNumber = naiveFibonacci(slowness)
	console.timeEnd(name)

	return (
		<div>
			Fibbonacci number {slowness}: {fibbonacciNumber}
		</div>
	)
}
