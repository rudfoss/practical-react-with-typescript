import { useEffect } from "react"

import { useHeaderService } from "../headerService"

export const HomePage = () => {
  const { setHeader } = useHeaderService()
  useEffect(() => {
    setHeader("Home")
  }, [setHeader])
  return <p>Welcome 👋</p>
}
