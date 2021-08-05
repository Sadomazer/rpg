import './index.scss';
import ClientGame from './client/ClientGame';
import ClientPlayer from './client/ClientPlayer';

ClientPlayer.getName('char_name');

if (ClientPlayer.playerName != '') {
  window.addEventListener('load', () => {
    ClientGame.init({ tagId: 'game' });
  });
}
