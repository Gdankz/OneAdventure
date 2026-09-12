import type { Checkpoint } from '../types/game'

export const QUEST_OBJECTIVES: Record<Checkpoint, string> = {
    INTRO: 'Open the adventure.',
    FIND_VIBE: 'Find your vibe.',
    EXPLORE_CAFES: 'Explore the cafes and pick your favorites.',
    SELECT_DAY: 'Select a day.',
    SELECT_TIME: 'Select a time.',
    FINAL_UNLOCKED: 'Find the newly opened path',
    COMPLETED: 'Quest completed.',
}