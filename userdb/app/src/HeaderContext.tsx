import { createContext, ReactNode, useState } from "react"

interface HeaderContextProps {
  header: string
  setHeader: (newHeader: string) => unknown
}

export const HeaderContext = createContext<HeaderContextProps>({
  header: "👋",
  setHeader: () => 0
})

export interface HeaderContextProviderProps {
  children: ReactNode
}

export const HeaderContextProvider = ({
  children
}: HeaderContextProviderProps) => {
  const [header, setHeader] = useState("💥")

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}
