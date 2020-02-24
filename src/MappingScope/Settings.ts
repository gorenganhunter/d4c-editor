

export type Settings = {

  general: {

    song_volume: number
    effect_volume: number

    background_dim: number

  }

  editor: {

    // global

    keep_pitch: boolean

    // timing

    justify_find_nearest: boolean
    /** 1 | 2 | 3 | 4 | 6 | 8 | 16 | 48 */
    justify_grid_divisor: number

    show_info_window: boolean

    warn_for_same_pos_notes: boolean
  }

  game: {

  }
}

export const DefaultSettings: Settings = {
  general: { song_volume: 1, effect_volume: 1, background_dim: 0.7 },
  editor: {
    keep_pitch: false, justify_find_nearest: true, justify_grid_divisor: 48, show_info_window: true,
    warn_for_same_pos_notes: true
  },
  game: {}
}