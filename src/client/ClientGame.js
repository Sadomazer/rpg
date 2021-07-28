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
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  /*  direction = {
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
      if (keydowm && this.player.motionProgress === 1) {
        const canMove = this.player.moveByCellCoord(x, y, (cell) => {
          return cell.findObjectsByType('grass').length;
        });

        if(canMove) {
          this.player.setState(direction);
          this.player.once('motion-stopped', () => player.setState('main'));
        }
      }
    };
  }

  initKeys() {
    let temp = Object.entries(this.direction).reduce((acc, [key, value]) => {
      acc[key] = this.control(value.x, value.y);
      return acc;
    }, {});

    this.engine.input.onKey(temp);
  }*/

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayerToDir('left'),
      ArrowRight: (keydown) => keydown && this.movePlayerToDir('right'),
      ArrowUp: (keydown) => keydown && this.movePlayerToDir('up'),
      ArrowDown: (keydown) => keydown && this.movePlayerToDir('down'),
    });
  }

  movePlayerToDir(dir) {
    const dirs = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMovie = player.moveByCellCoord(dirs[dir][0], dirs[dir][1], (cell) => {
        return cell.findObjectsByType('grass').length;
      });

      if (canMovie) {
        player.setState(dir);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}

export default ClientGame;
