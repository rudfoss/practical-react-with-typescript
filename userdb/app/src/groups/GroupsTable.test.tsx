import { fireEvent, getAllByRole, render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { GroupsTable } from "./GroupsTable"
import { staticGroups } from "./staticGroups"
import "@testing-library/jest-dom/vitest"

describe("GroupsTable", () => {
	it("is defined", () => {
		expect(typeof GroupsTable).toEqual("function")
	})

	it("renders a table", () => {
		const { getByRole } = render(<GroupsTable groups={staticGroups} />)
		expect(getByRole("table")).toBeDefined()
	})
	it("renders the correct number of rows", () => {
		const { getByTestId } = render(<GroupsTable groups={staticGroups} />)
		const tableBody = getByTestId("tableBody")
		expect(getAllByRole(tableBody, "row")).toHaveLength(4) // Heading + 4 groups
	})
	it("first element matches first group", () => {
		const { getByTestId } = render(<GroupsTable groups={staticGroups} />)
		const tableBody = getByTestId("tableBody")

		const [firstRow] = getAllByRole(tableBody, "row")
		const [idCell, displayNameCell] = getAllByRole(firstRow, "cell")
		const [firstGroup] = staticGroups

		expect(idCell).toHaveTextContent(firstGroup.id)
		expect(displayNameCell).toHaveTextContent(firstGroup.displayName)
	})
	it("sorts by id", () => {
		const staticIds = staticGroups.map(({ id }) => id)
		const { getByTestId, getByRole, rerender } = render(<GroupsTable groups={staticGroups} />) // Use original groups table otherwise sorting is not properly tested

		const tableBodyBefore = getByTestId("tableBody")
		const rowsBefore = getAllByRole(tableBodyBefore, "row")
		const idsBefore = rowsBefore
			.map((row) => getAllByRole(row, "cell")[0].textContent)
			.filter(Boolean) as string[]
		expect(idsBefore).toEqual(staticIds)

		// Click and rerender with new state
		const [idButton] = getAllByRole(getByRole("table"), "button")
		fireEvent.click(idButton)
		rerender(<GroupsTable groups={staticGroups} />)

		const tableBodyAfter = getByTestId("tableBody")
		const rowsAfter = getAllByRole(tableBodyAfter, "row")
		const idsAfter = rowsAfter
			.map((row) => getAllByRole(row, "cell")[0].textContent)
			.filter(Boolean) as string[]
		expect(idsBefore).not.toEqual(idsAfter)

		// Manually sort to verify
		staticIds.sort((a, b) => a?.localeCompare(b))
		expect(idsAfter).toEqual(staticIds)
	})
	it("sorts by displayName", () => {
		const staticDisplayNames = staticGroups.map(({ displayName }) => displayName)
		const { getByTestId, getByRole, rerender } = render(<GroupsTable groups={staticGroups} />) // Use original groups table otherwise sorting is not properly tested

		const tableBodyBefore = getByTestId("tableBody")
		const rowsBefore = getAllByRole(tableBodyBefore, "row")
		const displayNamesBefore = rowsBefore
			.map((row) => getAllByRole(row, "cell")[1].textContent)
			.filter(Boolean) as string[]
		expect(displayNamesBefore).toEqual(staticDisplayNames)

		// Click and rerender with new state
		const [, displayNameButton] = getAllByRole(getByRole("table"), "button")
		fireEvent.click(displayNameButton)
		rerender(<GroupsTable groups={staticGroups} />)

		const tableBodyAfter = getByTestId("tableBody")
		const rowsAfter = getAllByRole(tableBodyAfter, "row")
		const displayNamesAfter = rowsAfter
			.map((row) => getAllByRole(row, "cell")[1].textContent)
			.filter(Boolean) as string[]
		expect(displayNamesBefore).not.toEqual(displayNamesAfter)

		// Manually sort to verify
		staticDisplayNames.sort((a, b) => a?.localeCompare(b))
		expect(displayNamesAfter).toEqual(staticDisplayNames)
	})
})
