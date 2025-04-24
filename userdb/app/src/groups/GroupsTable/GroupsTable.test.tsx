import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { staticGroups } from "../staticGroups"
import { GroupsTable } from "./GroupsTable"

describe("GroupsTable", () => {
	it("should render all groups as rows", () => {
		const { getAllByRole } = render(<GroupsTable groups={staticGroups} />)
		expect(getAllByRole("row")).toHaveLength(staticGroups.length + 1)
	})
})
