import { useHeaderService } from "./headerService"

interface HeaderProps {
  children: string
}

export const Header = (props: HeaderProps) => {
  const { header } = useHeaderService()
  return <h1>{header}</h1>
}
