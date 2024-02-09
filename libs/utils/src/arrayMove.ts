/**
 * Creates a shallow copy of the array and moves an item from one index to another.
 * @param array The array in which the item exists
 * @param fromIndex The index of the item to move
 * @param toIndex The new index for the item
 * @returns A new array with the item moved.
 */
export const arrayMove = <TItem>(array: TItem[], fromIndex: number, toIndex: number) => {
	const movedArray = [...array]
	const [item] = movedArray.splice(fromIndex, 1)
	movedArray.splice(toIndex, 0, item)
	return movedArray
}
