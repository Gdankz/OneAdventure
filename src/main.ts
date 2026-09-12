import Phaser from 'phaser'
import './styles/main.css'
import { createGameConfig } from './game/config/game.config'

new Phaser.Game(createGameConfig('game-root'))
