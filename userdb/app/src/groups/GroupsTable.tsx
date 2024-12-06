import { makeStyles } from "@griffel/react"
import React from "react"
import { Link } from "react-router-dom"

import { Group } from "@practical-react/userdb-api-clients-react"

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

export interface GroupsTableProps {
  groups: Group[]
  showDeleteButton: boolean
  createGroupLink: (group: Group) => string
  deleteGroup: (groupId: string) => unknown
}

const GroupsTableDirect = ({
  groups,
  showDeleteButton,
  createGroupLink,
  deleteGroup
}: GroupsTableProps) => {
  const classes = useClasses()

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
        {groups.map((group) => (
          <tr key={group.id}>
            <td>
              <Link to={createGroupLink(group)}>{group.id}</Link>
            </td>
            <td>{group.displayName}</td>
            <td>
              {showDeleteButton && (
                <button onClick={() => deleteGroup(group.id)}>🗑️</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const GroupsTable = React.memo(GroupsTableDirect)
