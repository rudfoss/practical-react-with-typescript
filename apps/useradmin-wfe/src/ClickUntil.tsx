import { NumericField } from "@prt/fields"
import { useUserService } from "@prt/services"

import { useLocalStorage } from "./useLocalStorage"

export interface ClickUntilProps {
	limit: number
	limitMessage: string
}

export const ClickUntil = ({ limitMessage, limit }: ClickUntilProps) => {
	const [count, setCount] = useLocalStorage("increment", 0)
	const { user, userIndex, changeUserIndex } = useUserService()
	const isAtLimit = count >= limit

	const increment = () => {
		setCount(count + 1)
	}
	const reset = () => {
		setCount(0)
	}

	return (
		<>
			<NumericField
				label="Pick user"
				value={userIndex}
				onChange={changeUserIndex}
				min={0}
				max={9}
			/>
			<button disabled={isAtLimit} onClick={increment}>
				Increment
			</button>
			<p>{isAtLimit ? limitMessage : `${user.firstName} clicked: ${count} time(s)`}</p>
			<button onClick={reset}>Reset</button>
		</>
	)
}
