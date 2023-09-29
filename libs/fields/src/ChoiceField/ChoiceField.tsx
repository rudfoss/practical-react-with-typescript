import { ChangeEvent, useId, useMemo } from "react"

import { useFieldsService } from "../FieldsService"

export interface ChoiceOption {
	label: string
	id: string
}
export interface ChoiceFieldProps<TChoice> {
	label: string

	choices: TChoice[]
	choiceToOption: (choice: TChoice) => ChoiceOption

	value?: TChoice
	onChange: (newChoice?: TChoice) => unknown
}

export const ChoiceField = <TChoice,>({
	label,

	choices,
	choiceToOption,

	value,
	onChange
}: ChoiceFieldProps<TChoice>) => {
	const id = useId()
	const { isDisabled } = useFieldsService()

	const selectedChoiceValue = useMemo(() => {
		if (!value) return ""
		return choiceToOption(value).id
	}, [choiceToOption, value])

	const choiceOptions = useMemo(() => {
		return choices.map((choice) => {
			const { label, id: value } = choiceToOption(choice)
			return (
				<option key={value} value={value}>
					{label}
				</option>
			)
		})
	}, [choices, choiceToOption])

	const onSelectChoice = (evt: ChangeEvent<HTMLSelectElement>) => {
		const selectedChoice = choices.find((aChoice) => {
			const { id: value } = choiceToOption(aChoice)
			return evt.target.value === value
		})
		onChange(selectedChoice)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				onChange={onSelectChoice}
				value={selectedChoiceValue}
				disabled={isDisabled}
			>
				<option value="">(no user selected)</option>
				{choiceOptions}
			</select>
		</div>
	)
}
