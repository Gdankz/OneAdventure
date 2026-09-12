import type { CafeDefinition } from '../types/game'

export const CAFES: readonly CafeDefinition[] = [
    {
        id: 'reading_room',
        gameName: 'The Reading Room',
        realName: 'The Reading Room',
        vibes: ['quiet_cozy', 'outdoor_chill'],
        mapKey: 'cafe_reading_room',
        spawnObjectName: 'player_spawn',
    },
    {
        id: 'little_fern',
        gameName: 'Little Fern',
        realName: 'Little Fern',
        vibes: ['quiet_cozy','sweet_fun'],
        mapKey: 'cafe_little_fern',
        spawnObjectName: 'player_spawn',
    },
    {
        id: 'sugarbell',
        gameName: 'Sugarbell Cafe',
        realName: 'Sugarbell Cafe',
        vibes: ['sweet_fun'],
        mapKey: 'cafe_sugarbell',
        spawnObjectName: 'player_spawn',
    },
    {
        id: 'garden_hour',
        gameName: 'Garden Hour',
        realName: 'Garden Hour',
        vibes: ['sweet_fun','outdoor_chill'],
        mapKey: 'cafe_garden_hour',
        spawnObjectName: 'player_spawn',
    },
]