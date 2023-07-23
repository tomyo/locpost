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
  'http://gun-manhattan.herokuapp.com/gun',
] } = {}) {
  return gun ? gun : gun = window.GUN({ peers });
}

export function useMessages(scope, { keyPrefix = 'messages-' } = {}) {
  return useGun().get(keyPrefix + scope);
}
