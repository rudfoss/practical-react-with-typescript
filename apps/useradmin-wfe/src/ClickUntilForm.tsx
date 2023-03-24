import styled from "@emotion/styled"
import { useState } from "react"

import { NumericField, TextField } from "@prt/fields"

import { ClickUntil } from "./ClickUntil"

interface ContainerProps {
	borderSize: number
}
const Container = styled.div<ContainerProps>`
	border: 3px dashed hotpink;
	margin: 4px;
	padding: 4px;
	border-radius: ${(props) => `${props.borderSize}px`};
`
const StyledTextField = styled(TextField)`
	border: 5px solid #f00;
`

export const ClickUntilForm = () => {
	const [limit, setLimit] = useState(15)
	const [limitMessage, setLimitMessage] = useState("limit reached")

	return (
		<Container borderSize={limit}>
			<NumericField label="Limit" value={limit} onChange={setLimit} min={1} max={30} />
			<StyledTextField label="Limit message" value={limitMessage} onChange={setLimitMessage} />
			<ClickUntil limit={limit} limitMessage={limitMessage} />
		</Container>
	)
}
