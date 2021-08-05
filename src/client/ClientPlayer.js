import ClientGameObject from './ClientGameObject';

class ClientPlayer extends ClientGameObject {
  constructor(cfg) {
    super(cfg);

    this.playerName = '';

    const world = cfg.cell.world;

    world.game.setPlayer(this);
  }

  static getName(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    let res = p ? p[1] : false;
    this.playerName = res;
    return console.log(res);
  }

  render(time) {
    super.render(time);

    const { world } = this;

    world.engine.renderSign({
      x: this.x + world.cellWidth / 2,
      y: this.y - 15,
      minWidth: world.cellWidth,
      maxWidth: world.cellWidth * 1.5,
      text: this.playerName,
    });
  }
}

export default ClientPlayer;
