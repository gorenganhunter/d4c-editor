import { EditMap, TimeScale, FreshTimescaleCache, ResortTsGroup } from "../../EditMap"
import { assert, neverHappen, shallowPatch } from "../../../Common/utils"
import { makeAction } from "./types"
import { observable } from "mobx"


const add = (map: EditMap, id: number, tsgroup: number, timescale: number, timepoint: number, offset: number, disk: number) => {
  const ts: TimeScale = observable({
    id, tsgroup, timescale, timepoint, offset, disk,
    realtimecache: 0
  })

  const g = assert(map.tsgroups.get(tsgroup))
  g.timescales.push(id)
  map.timescales.set(id, ts)

  FreshTimescaleCache(map, ts)
  ResortTsGroup(map, g)

  return ts
}

const del = (map: EditMap, id: number) => {
  const ts = assert(map.timescales.get(id))

  const g = assert(map.tsgroups.get(ts.tsgroup))
  g.timescales = g.timescales.filter(x => x !== ts.id)
  map.timescales.delete(id)
  
  ResortTsGroup(map, g)

  return ts
}

type PatchType = Partial<Pick<TimeScale, "timescale" | "timepoint" | "offset" | "disk">>

const setv = (map: EditMap, id: number, patch: PatchType) => {
  const ts = assert(map.timescales.get(id))
  const changes = shallowPatch(ts, patch)
  if (changes) {

    FreshTimescaleCache(map, ts)

    const g = assert(map.tsgroups.get(ts.tsgroup))
    ResortTsGroup(map, g)

    return changes
  }
}

export const TimescaleActions = {
  Add: makeAction((map: EditMap, id: number, tsgroup: number, timescale: number, timepoint: number, offset: number, disk: number) => {
    const res = add(map, id, tsgroup, timescale, timepoint, offset, disk)
    if (res)
      return (map: EditMap) => del(map, res.id)
  }),
  Remove: makeAction((map: EditMap, id: number) => {
    const res = del(map, id)
    if (res)
      return (map: EditMap) => add(map, res.id, res.tsgroup, res.timescale, res.timepoint, res.offset, res.disk)
  }),
  Set: makeAction((map: EditMap, id: number, patch: PatchType) => {
    const res = setv(map, id, patch)
    if (res)
      return (map: EditMap) => setv(map, id, res)
  })
}
