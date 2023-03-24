import { useState } from "react"

export type ConfirmDeleteButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

export const ConfirmDeleteButton = (props: ConfirmDeleteButtonProps) => {
	const [isConfirming, setIsConfirming] = useState(false)
	const { onClick, ...rest } = props

	const confirmAction = () => {
		setIsConfirming(true)
	}
	const cancelConfirm = () => {
		setIsConfirming(false)
	}
	const confirmAndDoAction: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
		setIsConfirming(false)
		onClick?.(evt)
	}

	return isConfirming ? (
		<span>
			Are you sure? <button onClick={confirmAndDoAction}>Yes</button> :{" "}
			<button onClick={cancelConfirm}>Hell naw!</button>
		</span>
	) : (
		<button {...rest} onClick={confirmAction} />
	)
}
