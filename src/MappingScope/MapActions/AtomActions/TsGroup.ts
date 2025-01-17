import { EditMap, TimeScaleGroup } from "../../EditMap"
import { assert, neverHappen, shallowPatch } from "../../../Common/utils"
import { makeAction } from "./types"
import { observable } from "mobx"


const add = (map: EditMap, id: number, name: string) => {
  const tsgroup: TimeScaleGroup = observable({
    id, name, timescales: []
  })
  map.tsgroups.set(id, tsgroup)

  return tsgroup
}

const del = (map: EditMap, id: number) => {
  const g = assert(map.tsgroups.get(id))
  if (g.timescales.length > 0) neverHappen()

  map.tsgroups.delete(id)

  return g
}

type PatchType = Partial<Pick<TimeScaleGroup, "name">>

const set = (map: EditMap, id: number, patch: PatchType) => {
  const g = assert(map.tsgroups.get(id))
  const changes = shallowPatch(g, patch)
  if (changes) {

    return changes
  }
}

export const TsGroupActions = {
  Add: makeAction((map: EditMap, id: number, name: string) => {
    const res = add(map, id, name)
    if (res)
      return (map: EditMap) => del(map, res.id)
  }),
  Remove: makeAction((map: EditMap, id: number) => {
    const res = del(map, id)
    if (res)
      return (map: EditMap) => add(map, res.id, res.name)
  }),
  Set: makeAction((map: EditMap, id: number, patch: PatchType) => {
    const res = set(map, id, patch)
    if (res)
      return (map: EditMap) => set(map, id, res)
  })
}
