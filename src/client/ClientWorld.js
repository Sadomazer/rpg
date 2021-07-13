import worldCfg from '../config/world.json';

class ClientWorld {
  spriteW = 48;
  spriteH = 48;

  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    const { map } = worldCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * this.spriteW,
          y: y * this.spriteH,
          w: 48,
          h: 48,
        });
      });
    });
  }
}

export default ClientWorld;
