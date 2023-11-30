import styled from "@emotion/styled"

export const Label = styled.label`
	display: block;
`
interface InputProps {
	inputWidthPercentage: number
}
export const Input = styled.input<InputProps>`
	display: block;
	width: ${(props) => props.inputWidthPercentage}%;
`
