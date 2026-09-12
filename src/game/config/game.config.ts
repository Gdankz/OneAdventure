import Phaser from 'phaser'

export const LOGICAL_WIDTH = 540
export const LOGICAL_HEIGHT = 960

export function createGameConfig(
  parent: string | HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[] = [],
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: LOGICAL_WIDTH,
    height: LOGICAL_HEIGHT,
    backgroundColor: '#f3eadf',
    physics: {
      default: 'arcade',
      arcade: { debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: LOGICAL_WIDTH,
      height: LOGICAL_HEIGHT,
    },
    scene: scenes,
  }
}
