export interface ChoiceFieldChoice {
	label: string
	value: string
}

export interface ChoiceFieldBaseProps<TChoice extends ChoiceFieldChoice> {
	value?: TChoice
	onChange(newValue?: TChoice): unknown

	options: TChoice[]

	label: string
}
