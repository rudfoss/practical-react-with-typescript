import { StaticGroup } from "./staticGroups"

export interface ListGroupsProps {
  groups: StaticGroup[]
}

export const ListGroups = ({ groups }: ListGroupsProps) => (
  <ul>
    {groups.map((group) => (
      <li key={group.id}>
        {group.displayName} ({group.id})
      </li>
    ))}
  </ul>
)
