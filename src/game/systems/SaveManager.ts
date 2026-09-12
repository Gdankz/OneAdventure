import type { Checkpoint, FinalResponse, GameState, Vibe } from '../types/game'

export interface StorageLike {
    getItem(key: string): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
}

export const SAVE_KEY = 'one-small-quest-save'

const checkpoints = new Set<Checkpoint>([
  'INTRO', 'FIND_VIBE', 'EXPLORE_CAFES', 'SELECT_DAY', 'SELECT_TIME', 'FINAL_UNLOCKED', 'COMPLETED',
])
const vibes = new Set<Vibe>(['quiet_cozy', 'sweet_fun', 'outdoor_chill'])
const responses = new Set<FinalResponse>(['lets_go', 'maybe_another_time', 'check_schedule'])

function isNullableString(value: unknown): value is string | null {
    return value === null || typeof value === 'string'
}

export function isGameState(value: unknown): value is GameState {
    if (!value || typeof value !== 'object') return false
    const state = value as Record<string, unknown>
    return (
        state.version === 1 &&
        checkpoints.has(state.checkpoint as Checkpoint) &&
        (state.vibe === null || vibes.has(state.vibe as Vibe)) &&
        isNullableString(state.selectedCafe) &&
        isNullableString(state.selectedDay) &&
        isNullableString(state.selectedTime) &&
        (state.response === null || responses.has(state.response as FinalResponse)) &&
        typeof state.sfxEnabled === 'boolean'
    )
}

export class SaveManager {
      constructor(private readonly storage: StorageLike = window.localStorage) {}

  load(): GameState | null {
    try {
      const raw = this.storage.getItem(SAVE_KEY)
      if (!raw) return null
      const parsed: unknown = JSON.parse(raw)
      return isGameState(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  save(state: GameState): void {
    try {
      this.storage.setItem(SAVE_KEY, JSON.stringify(state))
    } catch {
      // Persistence is optional; gameplay must continue when storage is unavailable.
    }
  }

  clear(): void {
    try { this.storage.removeItem(SAVE_KEY) } catch { /* optional persistence */ }
  }
}