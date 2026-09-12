export type Vibe = 'quiet_cozy' | 'sweet_fun' | 'outdoor_chill'

export type Checkpoint =
    | 'INTRO'
    | 'FIND_VIBE'
    | 'EXPLORE_CAFES'
    | 'SELECT_DAY'
    | 'SELECT_TIME'
    | 'FINAL_UNLOCKED'
    | 'COMPLETED'

export type FinalResponse =
    | 'lets_go'
    | 'maybe_another_time'
    | 'check_schedules'

export interface GameState {
    version: 1
    checkpoint: Checkpoint
    vibe: Vibe | null
    selectedCafe: string | null
    selectedDay: string | null
    selectedTime: string | null
    response: FinalResponse | null
    sfxEnabled: boolean
}

export interface CafeDefinition {
    id: string
    gameName: string
    realName: string
    vibes: readonly Vibe[]
    mapKey: string
    spawnObjectName: string
}

export interface InvitationConfig {
    availableDays: readonly string[]
    availableTimes: readonly string[]
    instagramUrl: string | null
}

export function createInitialGameState(): GameState {
    return {
        version: 1,
        checkpoint: 'INTRO',
        vibe: null,
        selectedCafe: null,
        selectedDay: null,
        selectedTime: null,
        response: null,
        sfxEnabled: true,
    }
}