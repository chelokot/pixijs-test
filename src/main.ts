import { GameState } from './entities/state.ts';
import { GameMap } from './entities/game-map.ts';
import { Character } from './entities/character.ts';
import { Animal } from './entities/animal.ts';
import { initPixiApp } from './engine/pixi.ts';

const root = document.querySelector<HTMLDivElement>('#root');
if (!root) {
  throw new Error('Root element not found');
}

const app = await initPixiApp({
  width: root.clientWidth,
  height: root.clientHeight,
});

root.appendChild(app.canvas);

const map = new GameMap();
const pig = new Animal();
const player = new Character();

const state = new GameState({
  map,
  player,
  movables: [pig],
});

await map.init({
  app,
  width: app.screen.width * 2,
  height: app.screen.height * 2,
});

await pig.init({
  app,
  state,
  initialX: 500,
  initialY: 500,
  fileName: 'pig',
  width: 168,
  height: 64,
});

await player.init({
  app,
  state,
  onMove: state.handleMovement.bind(state),
});
