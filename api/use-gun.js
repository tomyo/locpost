'use strict'

import '../lib/gun.js';
import '../lib/sea.js';
import '../lib/webrtc.js';

let gun;

/**
 *
 * @param {Object} options - See https://gun.eco/docs/API#options
 * @returns A configured instance of gun.
 */
export function useGun({ peers = [
  'http://localhost:8765/gun',
  'https://gunrelayeurope.herokuapp.com/gun',
] } = {}) {
  if (gun) return gun;
  if (typeof (window.GUN) === 'undefined') throw Error('GUN is not available in global scope');

  gun = window.GUN({ peers });
  return gun;
}

export function useMessages(context, { searchKeyPrefix = 'messages-' } = {}) {

  const gun = useGun();
  return gun.get(searchKeyPrefix + context);
}
