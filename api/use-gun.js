'use strict'

import '../lib/gun.js';
import '../lib/sea.js';
import '../lib/webrtc.js';

let gun;

export function useGun(GUN, {
  localHostUrl = 'http://localhost:8765/gun',
  remoteHostUrl = 'https://gun-manhattan.herokuapp.com/gun',
} = {}) {
  if (gun) return gun;
  if (typeof (window.GUN) === 'undefined') throw Error('GUN is not available in global scope');

  gun = window.GUN([localHostUrl, remoteHostUrl]);
  return gun;
}

export function useMessages(context, { searchKeyPrefix = 'messages-' } = {}) {

  const gun = useGun();
  return gun.get(searchKeyPrefix + context);
}
