import { describe, expect, it } from 'vitest'
import { GameSession } from '../../src/game/core/GameSession'
import { SaveManager, type StorageLike } from '../../src/game/systems/SaveManager'
import { createInitialGameState } from '../../src/game/types/game'

class MemoryStorage implements StorageLike {
  private data = new Map<string, string>()

  getItem(key: string) { return this.data.get(key) ?? null }
  setItem(key: string, value: string) { this.data.set(key, value) }
  removeItem(key: string) { this.data.delete(key) }
}

describe('GameSession', () => {
  it('autosaves after every state-changing choice', () => {
    const save = new SaveManager(new MemoryStorage())
    const session = new GameSession(save)
    session.startNew()
    session.chooseVibe('quiet_cozy')
    expect(save.load()?.checkpoint).toBe('EXPLORE_CAFES')

    session.chooseCafe('reading_room')
    expect(save.load()?.checkpoint).toBe('SELECT_DAY')
  })

  it('loads an existing save when continuing', () => {
    const save = new SaveManager(new MemoryStorage())
    save.save({
      ...createInitialGameState(),
      checkpoint: 'SELECT_DAY',
      vibe: 'quiet_cozy',
      selectedCafe: 'reading_room',
    })
    expect(new GameSession(save).continueSaved().checkpoint).toBe('SELECT_DAY')
  })
})
