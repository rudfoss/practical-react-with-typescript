interface HeaderProps {
  children: string
}

export const Header = (props: HeaderProps) => <h1>{props.children}</h1>
