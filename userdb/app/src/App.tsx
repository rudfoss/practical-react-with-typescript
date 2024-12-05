import { useState } from "react"

import { ChoiceField, ChoiceFieldOption } from "@practical-react/ui"

import {
  ListGroups,
  StaticGroup,
  staticGroups,
  StaticGroupTable
} from "./groups"

const groupToOption = (group: StaticGroup): ChoiceFieldOption => ({
  label: group.displayName,
  value: group.id
})

export const App = () => {
  const [groups, setGroups] = useState<StaticGroup[]>(staticGroups)
  const [selectedGroup, setSelectedGroup] = useState<StaticGroup>()

  return (
    <>
      <ListGroups groups={groups} />
      <StaticGroupTable groups={groups} setGroups={setGroups} />
      <ChoiceField
        label="Pick a group"
        choices={groups}
        value={selectedGroup}
        setValue={setSelectedGroup}
        choiceToOption={groupToOption}
      />
    </>
  )
}
