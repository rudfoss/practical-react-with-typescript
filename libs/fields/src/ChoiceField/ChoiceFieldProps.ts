export interface ChoiceFieldChoice<TDataType> {
	label: string
	value: string
	data: TDataType
}

export interface ChoiceFieldProps<TDataType> {
	label: string
	disabled?: boolean

	options: ChoiceFieldChoice<TDataType>[]

	value?: ChoiceFieldChoice<TDataType>
	onChange: (newChoice?: ChoiceFieldChoice<TDataType>) => unknown
}
