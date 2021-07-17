import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import gameObjects from '../config/gameObjects.json';

import sprites from '../config/sprites';
import levelCfg from '../config/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();

    document.getElementById(this.cfg.tagId).focus();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  direction = {
    ArrowLeft: {
      x: -1,
      y: 0,
    },
    ArrowRight: {
      x: 1,
      y: 0,
    },
    ArrowUp: {
      x: 0,
      y: -1,
    },
    ArrowDown: {
      x: 0,
      y: 1,
    },
  };

  control(x, y) {
    return (keydowm) => {
      if (keydowm) {
        this.player.moveByCellCoord(x, y, (cell) => {
          return cell.findObjectsByType('grass').length;
        });
      }
    };
  }

  initKeys() {
    let temp = Object.entries(this.direction).reduce((acc, [key, value]) => {
      acc[key] = this.control(value.x, value.y);
      return acc;
    }, {});

    this.engine.input.onKey(temp);
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}

export default ClientGame;
