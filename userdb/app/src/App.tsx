import { useState } from "react"

import { Header } from "./Header"
import { TextField } from "./TextField"

export const App = () => {
  const [heading, setHeading] = useState("Enter a heading 👋")

  return (
    <>
      <Header>{heading}</Header>
      <TextField label="Enter heading" value={heading} setValue={setHeading} />
    </>
  )
}
