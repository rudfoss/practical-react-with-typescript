import { ValidationError } from "./ValidationError"

describe("ValidationError", () => {
  it("is defined", () => {
    expect(typeof ValidationError).toEqual("function")
  })
  it("extends error", () => {
    const inst = new ValidationError([])
    expect(inst).toBeInstanceOf(Error)
  })
})
