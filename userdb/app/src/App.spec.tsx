import { render } from "@testing-library/react"

import { App } from "./App"

describe("App", () => {
  it("is defined", () => {
    expect(typeof App).toBe("function")
  })

  it("renders a heading", async () => {
    const { getByRole } = render(<App />)
    expect(getByRole("heading").textContent).toEqual("It works 🥳")
  })
})
