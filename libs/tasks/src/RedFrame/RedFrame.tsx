import { ReactNode } from "react"

export interface RedFrameProps {
	children: ReactNode
}

export const RedFrame = ({ children }: RedFrameProps) => {
	return <div style={{ border: "3px dashed #f00" }}>{children}</div>
}
