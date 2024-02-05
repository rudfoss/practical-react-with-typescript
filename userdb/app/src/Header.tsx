export interface HeaderProps {
	children: string
}

export function Header({ children }: HeaderProps) {
	return <h1>{children}</h1>
}
