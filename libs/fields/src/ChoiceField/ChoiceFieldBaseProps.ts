import { ChoiceFieldChoice } from "./ChoiceFieldChoice"

export interface ChoiceFieldBaseProps<TData> {
	value?: ChoiceFieldChoice<TData>
	onChange(newValue?: ChoiceFieldChoice<TData>): unknown

	options: ChoiceFieldChoice<TData>[]

	label: string
}
