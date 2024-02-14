export interface HeaderProps {
	children: string
}

export const Header = ({ children }: HeaderProps) => {
	return <h1>{children}</h1>
}
