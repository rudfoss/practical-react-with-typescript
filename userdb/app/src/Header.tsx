import { useContext } from "react"

import { HeaderContext } from "./HeaderContext"

interface HeaderProps {
  children: string
}

export const Header = (props: HeaderProps) => {
  const { header } = useContext(HeaderContext)
  return <h1>{header}</h1>
}
