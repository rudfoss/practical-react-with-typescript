import { ChangeEvent, useId } from "react"

import { Container, Label } from "../FieldStyles"
import { useFieldsServiceDisabled } from "../FieldsService"

export interface ChoiceOption {
	label: string
	value: string
}

export interface ChoiceFieldProps<TOption> {
	label: string

	options: TOption[]
	optionsToChoiceOption: (option: TOption) => ChoiceOption

	value?: TOption
	onChange: (selectedOption?: TOption) => unknown
}

export const ChoiceField = <TOption,>({
	label,
	value,
	options,
	optionsToChoiceOption,
	onChange
}: ChoiceFieldProps<TOption>) => {
	const id = useId()
	const fieldsServiceDisabled = useFieldsServiceDisabled()

	const selectedOption = value && optionsToChoiceOption(value)
	const optionsAsChoiceOptions = options.map((option) => optionsToChoiceOption(option))

	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		for (const option of options) {
			if (optionsToChoiceOption(option).value === event.currentTarget.value) {
				onChange(option)
				return
			}
		}

		onChange()
	}

	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<select
				id={id}
				value={selectedOption?.value ?? ""}
				onChange={onSelectChange}
				disabled={fieldsServiceDisabled}
			>
				<option value=""></option>
				{optionsAsChoiceOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</Container>
	)
}
