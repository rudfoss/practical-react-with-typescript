import { nanoid } from "nanoid"
import { useMemo, useState } from "react"

const staticGroups = [
	{
		id: "5dd0a91a-d493-4fa1-b447-f90121f00bb0",
		displayName: "Administrator"
	},
	{
		id: "12b2f31a-a8e6-4e08-971c-a8594f16ab76",
		displayName: "User administrators"
	},
	{
		id: "716eabb3-5044-49f6-95c1-60efb5709143",
		displayName: "Users"
	},
	{
		id: "74614400-354b-4cee-889f-ec6aa8c36550",
		displayName: "Guests"
	}
]
type Group = (typeof staticGroups)[number]

export const KeyDemoPage = () => {
	const [items, setItems] = useState<Group[]>(() => [...staticGroups])
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [useKey, setUseKey] = useState(false)

	const sortedItems = useMemo(() => {
		const sortedItems = [...items]
		const multiplier = sortDirection === "asc" ? 1 : -1
		sortedItems.sort((a, b) => a.id.localeCompare(b.id) * multiplier)
		return sortedItems
	}, [items, sortDirection])

	const insertItem = () => {
		setItems((oldItems) => {
			const newItems = [...oldItems]
			const newId = nanoid()
			newItems.splice(Math.max(newItems.length - 2, 0), 0, {
				id: newId,
				displayName: newId
			})
			return newItems
		})
	}
	const toggleSort = () => {
		setSortDirection((oldDirection) => (oldDirection === "asc" ? "desc" : "asc"))
	}
	const toggleUseKey = () => {
		setUseKey((oldUseKey) => !oldUseKey)
	}
	const resetItems = () => {
		setItems([...staticGroups])
	}
	const removeItem = (id: Group["id"]) => {
		setItems((oldItems) => oldItems.filter((item) => item.id !== id))
	}

	return (
		<>
			<p>
				This page demonstrates an issue that can occur when not specifying a key attribute to the
				list of items.
			</p>
			<p>
				Manipulating the list should work mostly as expected, but if you open the browser developer
				tools "Elements" panel and expand the list down to each item you can see that
				adding/deleting and sorting affects many more items than it might need to when not using
				keys.
			</p>
			<button onClick={toggleUseKey}>Keys: {useKey ? "on" : "off"}</button>
			<button onClick={insertItem}>Insert item</button>
			<button onClick={toggleSort}>
				Sort {sortDirection === "asc" ? "ascending" : "descending"}
			</button>
			<button onClick={resetItems}>Reset</button>
			<ul>
				{sortedItems.map((item) => (
					<li key={useKey ? item.id : undefined}>
						{item.id} <button onClick={() => removeItem(item.id)}>Remove</button>
					</li>
				))}
			</ul>
		</>
	)
}
