import { Group } from "@practical-react/userdb-api-clients-react"

export interface GroupDetailsViewProps {
  group: Group
}

export const GroupDetailsView = ({ group }: GroupDetailsViewProps) => (
  <dl>
    <dt>Id</dt>
    <dd>{group.id}</dd>
    <dt>Display name</dt>
    <dd>{group.displayName}</dd>
    <dt>Roles</dt>
    <dd>{group.roles.join(", ")}</dd>
    <dt>Is System Defined</dt>
    <dd>{group.isSystemDefined ? "Yes" : "No"}</dd>
  </dl>
)
