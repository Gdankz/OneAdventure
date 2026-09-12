import { describe, expect, it } from 'vitest'
import { CAFES } from '../../src/game/data/cafes'
import { INVITATION_CONFIG } from '../../src/game/config/invitation.config'
import { createInitialGameState } from '../../src/game/types/game'

describe('invitation configuration', () => {
  it('defines exactly four cafés and three supported vibes', () => {
    expect(CAFES).toHaveLength(4)
    expect(new Set(CAFES.flatMap((cafe) => cafe.vibes))).toEqual(
      new Set(['quiet_cozy', 'sweet_fun', 'outdoor_chill']),
    )
  })

  it('provides at least two fixed day choices and two fixed time choices', () => {
    expect(INVITATION_CONFIG.availableDays.length).toBeGreaterThanOrEqual(2)
    expect(INVITATION_CONFIG.availableTimes.length).toBeGreaterThanOrEqual(2)
  })

  it('starts in INTRO with no invitation choices selected', () => {
    expect(createInitialGameState()).toEqual({
      version: 1,
      checkpoint: 'INTRO',
      vibe: null,
      selectedCafe: null,
      selectedDay: null,
      selectedTime: null,
      response: null,
      sfxEnabled: true,
    })
  })
})