import { render } from "@testing-library/react"

import { Header } from "./Header"

describe("Header", () => {
  it("is defined", () => {
    expect(typeof Header).toEqual("function")
  })
  it("to render an <h1>", () => {
    const { getByRole } = render(<Header>Heading content</Header>)
    const heading = getByRole("heading")
    expect(heading).toBeDefined()
    expect(heading.textContent).toEqual("Heading content")
  })
})
