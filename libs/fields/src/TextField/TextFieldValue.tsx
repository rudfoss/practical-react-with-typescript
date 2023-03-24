export interface TextFieldValueProps {
	value: string
}

export const TextFieldValue = ({ value }: TextFieldValueProps) => {
	return <p>{value}</p>
}
