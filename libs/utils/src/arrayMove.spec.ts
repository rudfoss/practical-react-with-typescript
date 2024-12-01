import { arrayMove } from "./arrayMove"

describe("arrayMove", () => {
  it("is defined", () => {
    expect(typeof arrayMove).toBe("function")
  })

  it("moves an item to a later index", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(arrayMove(array, 2, 6)).toEqual([1, 2, 4, 5, 6, 7, 3, 8])
  })
  it("moves an item to an earlier index", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(arrayMove(array, 6, 2)).toEqual([1, 2, 7, 3, 4, 5, 6, 8])
  })

  it("loops to the end when moving to a negative index", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(arrayMove(array, 2, -1)).toEqual([1, 2, 4, 5, 6, 7, 3, 8])
  })
  it("appends to the end when moving to an index beyond the array length", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(arrayMove(array, 3, 10)).toEqual([1, 2, 3, 5, 6, 7, 8, 4])
  })

  it("does not modify the original array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    const arrayDupe = [...array]
    const movedArray = arrayMove(array, 2, 4)
    const otherMovedArray = arrayMove(array, 1, 3)
    expect(array).toEqual(arrayDupe)
    expect(movedArray).not.toBe(array)
    expect(otherMovedArray).not.toBe(array)
  })
  it("works with object arrays", () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const movedArray = arrayMove(array, 0, 2)
    expect(movedArray).toEqual([
      { id: 2 },
      { id: 3 },
      { id: 1 },
      { id: 4 },
      { id: 5 }
    ])
  })
})
