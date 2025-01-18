import { once, assert, itemList } from "../../../Common/utils"
import { AudioSource, loadFromUrl, AudioInstance } from "../../../Common/AudioCtx"
import assets from "../../assets"
import { useEffect } from "react"
import { MappingState } from "./sharedState"
import { Music } from "../../states"
import { binarySearch } from "../../../Common/binarySearch"
import { createAnimLoop } from "../../../Common/hooks"
import { autorun, observable } from "mobx"
import { scope } from "../../../MappingScope/scope"

const sounds = once(() => ({
  perfect: AudioSource.from(loadFromUrl(assets.perfect)).load(),
  flick: AudioSource.from(loadFromUrl(assets.flick)).load(),
  tap: AudioSource.from(loadFromUrl(assets.d4dj_tap_sfx)).load(),
  tapAlt: AudioSource.from(loadFromUrl(assets.d4dj_tap_alt_sfx)).load(),
  scratch: AudioSource.from(loadFromUrl(assets.d4dj_scratch_sfx)).load(),
  sliderFlick: AudioSource.from(loadFromUrl(assets.d4dj_slide_flick_sfx)).load(),
}))

const images = once(() => {
  const list: (keyof typeof assets)[] = ["note_flick", "note_long", "note_normal", "note_slide_among"]
  list.forEach(async key => {
    const res = await fetch(assets[key])
    const file = await res.blob()
    assets[key] = URL.createObjectURL(file)
  })
})

let noSoundUntil = -1

const soundlist = observable({
  get list() {
    return MappingState.noteListOrdered.map(x => {
      if (x.type === "single") return { time: x.realtimecache, type: x.alt ? "tap" : "tap_alt" }
      if (x.lane == 0 || x.lane == 6) return { time: x.realtimecache, type: "scratch" }
      // const slide = assert(scope.map.slides.get(x.slide))
      // if (x.id === slide.notes[slide.notes.length - 1] && slide.flickend)
      //   return { time: x.realtimecache, type: "flick" }
      return { time: x.realtimecache, type: "tap_alt" }
    })
  }
})

const toBeStopped = new Set<AudioInstance>()

function animloop() {
  if (Music.playing) {
    const list = soundlist.list
    const position = Music.position()

    if (list.length <= 0) return
    let [index] = binarySearch(i => list[i].time, list.length, position)
    while (index < list.length && list[index].time <= position) index++
    if (index >= list.length) return

    const time = list[index].time
    if (time > position + 0.05) return
    if (time < noSoundUntil) return
    noSoundUntil = time + 0.01 * Music.playbackrate

    const s = sounds()

    while (index < list.length && list[index].time < noSoundUntil) {
      const au = new AudioInstance(list[index].type === "tap" ? s.tap : list[index].type === "scratch" ? s.scratch : s.tapAlt)
      au.play((list[index].time - position) / Music.playbackrate)
      au.onend.add(() => toBeStopped.delete(au))
      toBeStopped.add(au)
      index++
    }

  } else {
    noSoundUntil = -1
    for (const au of itemList(toBeStopped)) {
      au.stop()
    }
    toBeStopped.clear()
  }
}

autorun(() => {
  if (Music.position()) noSoundUntil = -1
})

export function useSoundEffect() {

  useEffect(() => {
    images()
  }, [])

  useEffect(() => createAnimLoop(animloop), [])

  useEffect(() => autorun(() => {
    const s = sounds()
    s.tap.volume = scope.settings.general.effect_volume
    s.tapAlt.volume = scope.settings.general.effect_volume
    s.scratch.volume = scope.settings.general.effect_volume
  }), [])
}
