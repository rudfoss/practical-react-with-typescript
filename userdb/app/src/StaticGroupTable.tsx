import { arrayMove } from "@practical-react/utils"

import classes from "./StaticGroupTable.module.css"
import { StaticGroup } from "./staticGroups"

export interface StaticGroupTableProps {
  groups: StaticGroup[]
  setGroups: (groups: StaticGroup[]) => unknown
}

export const StaticGroupTable = ({
  groups,
  setGroups
}: StaticGroupTableProps) => {
  const moveUp = (index: number) => {
    setGroups(arrayMove(groups, index, index - 1))
  }
  const moveDown = (index: number) => {
    setGroups(arrayMove(groups, index, index + 1))
  }
  const deleteItem = (index: number) => {
    setGroups(groups.filter((_, groupIndex) => groupIndex !== index))
  }

  return (
    <table className={classes.groupsTable}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Display Name</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.displayName}</td>
            <td>
              <button disabled={index === 0} onClick={() => moveUp(index)}>
                ⬆️
              </button>
              <button
                disabled={index >= groups.length - 1}
                onClick={() => moveDown(index)}
              >
                ⬇️
              </button>
              <button onClick={() => deleteItem(index)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
