'use strict'

import '../lib/gun.js';
import '../lib/sea.js';
import '../lib/webrtc.js';

let gun;

const config = {
  peers: [
    'http://localhost:8765/gun',
    'https://gunrelayeurope.herokuapp.com/gun',
  ],
};

/**
 *
 * @returns A configured instance of gun as a singleton
 */
function useGun() {
  // https://gun.eco/docs/API#options
  if (!gun) gun = window.GUN(config);
  return gun;
}

export function useMessages(key) {
  return useGun().get('messages-' + key);
}
