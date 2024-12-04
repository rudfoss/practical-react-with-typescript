import { useState } from "react"

import { Header } from "./Header"
import { PasswordField } from "./PasswordField"
import { TextField } from "./TextField"

export const App = () => {
  const [heading, setHeading] = useState("Enter a heading 👋")

  return (
    <>
      <Header>{heading}</Header>
      <TextField label="Enter heading" value={heading} setValue={setHeading} />
      <PasswordField
        label="Password"
        minLength={8}
        maxLength={128}
        value={heading}
        setValue={setHeading}
      />
    </>
  )
}
