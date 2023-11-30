import styled from "@emotion/styled"
import { ChangeEvent, useId } from "react"

// interface StyleMeProps {
// 	className?: string
// }
// const StyleMe = (props: StyleMeProps) => {
// 	return <p className={props.className}>I'm styled</p>
// }

const Container = styled.div`
	padding: 4px;
`
const Label = styled.label`
	display: block;
	padding-bottom: 4px;
`
const Input = styled.input`
	display: block;
	width: 100%;
`
// const MyStyleMe = styled(StyleMe)`
// 	color: hotpink;
// `

interface TextFieldProps {
	label: string
	value: string
	setValue: (newValue: string) => unknown
}

// type TextFieldPropsType = {
// 	label: string
// }

export const TextField = ({ label, value, setValue }: TextFieldProps) => {
	const id = useId()

	const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			{/* <MyStyleMe /> */}
			<Input id={id} type="text" value={value} onChange={onChangeHandler} />
		</Container>
	)
}
