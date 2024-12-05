import { render } from "@testing-library/react"

import { App } from "./App"

describe("App", () => {
  it("is defined", () => {
    expect(typeof App).toBe("function")
  })
})
