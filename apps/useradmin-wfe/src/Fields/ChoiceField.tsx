import styled from "@emotion/styled"
import { useId } from "react"

import { Container, Input, Label } from "./fieldComponents"

const Fieldset = Input.withComponent("fieldset")

const Radio = styled.input`
	margin-right: 8px;
`
const RadioLabel = styled.label`
	font-size: 1.1rem;
`

export interface ChoiceBase {
	label: string
	value: string
}

export interface ChoiceFieldProps<TChoice extends ChoiceBase> {
	label: string
	style?: "dropDown" | "radio"

	choices: TChoice[]
	value: TChoice | undefined
	onChange: (newChoice: TChoice | undefined) => unknown
}

export const ChoiceField = <TChoice extends ChoiceBase>({
	label,
	style = "dropDown",
	choices,
	value,
	onChange
}: ChoiceFieldProps<TChoice>) => {
	const id = useId()

	const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
		const selectedChoice = choices.find((choice) => choice.value === evt.target.value)
		onChange(selectedChoice)
	}

	if (style === "dropDown") {
		return (
			<Container>
				<Label htmlFor={id}>{label}</Label>
				<select id={id} value={value?.value ?? ""} onChange={onSelectChange}>
					{choices.map(({ label, value }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</Container>
		)
	}

	const onRadioChange =
		(choice: TChoice): React.ChangeEventHandler<HTMLInputElement> =>
		() => {
			onChange(choice)
		}

	return (
		<Fieldset>
			<legend>{label}</legend>
			{choices.map((choice) => (
				<Container key={choice.value}>
					<Radio
						id={`${id}-${choice.value}`}
						type="radio"
						value={choice.value}
						checked={choice.value === value?.value}
						onChange={onRadioChange(choice)}
					/>
					<RadioLabel htmlFor={`${id}-${choice.value}`}>{choice.label}</RadioLabel>
				</Container>
			))}
		</Fieldset>
	)
}
