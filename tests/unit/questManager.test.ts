import { describe, expect, it } from 'vitest'
import { QuestManager } from '../../src/game/systems/QuestManager'
import { createInitialGameState } from '../../src/game/types/game'

const manager = new QuestManager()

describe('QuestManager', () => {
  it('moves INTRO to FIND_VIBE before a vibe is chosen', () => {
    expect(manager.begin(createInitialGameState()).checkpoint).toBe('FIND_VIBE')
  })

  it('unlocks only cafés matching the selected vibe', () => {
    expect(manager.availableCafes('quiet_cozy').map((c) => c.id)).toEqual([
      'reading_room', 'little_fern',
    ])
  })

  it('rejects selecting a café outside the selected vibe', () => {
    const state = manager.chooseVibe(manager.begin(createInitialGameState()), 'quiet_cozy')
    expect(() => manager.chooseCafe(state, 'sugarbell')).toThrow(/not available/i)
  })

  it('reconverges to SELECT_DAY after a valid café selection', () => {
    let state = manager.begin(createInitialGameState())
    state = manager.chooseVibe(state, 'sweet_fun')
    state = manager.chooseCafe(state, 'sugarbell')
    expect(state.checkpoint).toBe('SELECT_DAY')
  })

  it('unlocks the final path only after a valid day and time', () => {
    let state = manager.begin(createInitialGameState())
    state = manager.chooseVibe(state, 'outdoor_chill')
    state = manager.chooseCafe(state, 'garden_hour')
    state = manager.chooseDay(state, 'Saturday')
    state = manager.chooseTime(state, '4:00 PM')
    expect(state.checkpoint).toBe('FINAL_UNLOCKED')
  })

  it.each([
    ['quiet_cozy', ['reading_room', 'little_fern']],
    ['sweet_fun', ['little_fern', 'sugarbell', 'garden_hour']],
    ['outdoor_chill', ['reading_room', 'garden_hour']],
  ] as const)('maps %s to the expected cafés', (vibe, expected) => {
    expect(manager.availableCafes(vibe).map((c) => c.id)).toEqual(expected)
  })
})
