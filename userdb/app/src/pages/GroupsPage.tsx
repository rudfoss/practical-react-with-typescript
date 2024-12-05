import { useState } from "react"
import { useParams } from "react-router-dom"

import { ChoiceField, ChoiceFieldOption, TextField } from "@practical-react/ui"

import { StaticGroup, staticGroups, StaticGroupTable } from "../groups"

const groupToOption = (group: StaticGroup): ChoiceFieldOption => ({
  label: group.displayName,
  value: group.id
})

export const GroupsPage = () => {
  const { groupId } = useParams<"groupId">()
  const [groups, setGroups] = useState(staticGroups)
  const [aGroup, setAGroup] = useState<StaticGroup>()
  const [groupName, setGroupName] = useState("")

  return (
    <>
      <TextField label="Find group" value={groupName} setValue={setGroupName} />
      <StaticGroupTable
        groups={groups}
        setGroups={setGroups}
        highlightGroupId={groupId}
      />
      <ChoiceField
        label="Pick group"
        choices={groups}
        value={aGroup}
        setValue={setAGroup}
        choiceToOption={groupToOption}
      />
    </>
  )
}
