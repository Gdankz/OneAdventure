import { describe, expect, it } from 'vitest'
import { SaveManager, type StorageLike } from '../../src/game/systems/SaveManager'
import { createInitialGameState } from '../../src/game/types/game'

class MemoryStorage implements StorageLike {
  private data = new Map<string, string>()

  getItem(key: string) { return this.data.get(key) ?? null }
  setItem(key: string, value: string) { this.data.set(key, value) }
  removeItem(key: string) { this.data.delete(key) }
}

describe('SaveManager', () => {
  it('round-trips valid state', () => {
    const manager = new SaveManager(new MemoryStorage())
    const state = { ...createInitialGameState(), checkpoint: 'FIND_VIBE' as const }
    manager.save(state)
    expect(manager.load()).toEqual(state)
  })

  it('returns null for malformed JSON instead of throwing', () => {
    const storage = new MemoryStorage()
    storage.setItem('one-small-quest-save', '{broken')
    expect(new SaveManager(storage).load()).toBeNull()
  })

  it('returns null for unsupported schema versions', () => {
    const storage = new MemoryStorage()
    storage.setItem('one-small-quest-save', JSON.stringify({ ...createInitialGameState(), version: 2 }))
    expect(new SaveManager(storage).load()).toBeNull()
  })

  it('clears persisted state', () => {
    const manager = new SaveManager(new MemoryStorage())
    manager.save(createInitialGameState())
    manager.clear()
    expect(manager.load()).toBeNull()
  })

  it('rejects a completed save without a response', () => {
    const storage = new MemoryStorage()
    storage.setItem('one-small-quest-save', JSON.stringify({
      ...createInitialGameState(),
      checkpoint: 'COMPLETED',
      response: null,
    }))
    expect(new SaveManager(storage).load()).toBeNull()
  })
})
