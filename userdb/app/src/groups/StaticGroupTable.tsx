import { makeStyles } from "@griffel/react"
import React from "react"

import { arrayMove } from "@practical-react/utils"

import { StaticGroup } from "./staticGroups"

const useClasses = makeStyles({
  table: {
    padding: "20px",
    "& tr th": {
      border: "3px solid red"
    }
  },
  highlight: {
    backgroundColor: "hotpink"
  }
})

export interface StaticGroupTableProps {
  highlightGroupId?: string

  groups: StaticGroup[]
  setGroups: (groups: StaticGroup[]) => unknown
}

const StaticGroupTableDirect = ({
  highlightGroupId,
  groups,
  setGroups
}: StaticGroupTableProps) => {
  const classes = useClasses()

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
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Display Name</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <tr
            key={group.id}
            className={group.id === highlightGroupId ? classes.highlight : ""}
          >
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

export const StaticGroupTable = React.memo(StaticGroupTableDirect)
