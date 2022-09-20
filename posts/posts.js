import { useMessages } from '../api/use-gun.js'

function getQueryString(key) {
  return new URLSearchParams(location.search).get(key);
}

function getLocationName(scopeSearchParam = 'location') {
  const v0_key = 'context';   // v0 search query was `context`

  return getQueryString(scopeSearchParam) || getQueryString(v0_key);
}

function setUpPublishNewMessage() {
  function formatNewMessage(formData) {
    const message = {}
    for (const [key, value] of formData) {
      message[key] = value;
    }
    message.date ??= new Date().toISOString();
    return message;
  }

  const button = document.querySelector('#create-new-message');
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const cancelButton = form.querySelector('[type="button"]');

  button.addEventListener('click', () => {
    dialog.showModal();
  })

  cancelButton.addEventListener('click', () => {
    dialog.close();
  })

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = formatNewMessage(new FormData(form));
    useMessages(getLocationName()).set(message);
    form.reset();
    dialog.close();
  });
};


function insertMessageIntoDom(msg, id, { inserFunctionName = "prepend" } = {}) {
  const div = document.createElement('div');
  div.innerHTML = /*html*/`
    <div></div>
    <small class="nickname"></small>
    <small><time></time></small>
  `;
  div.classList.add("message");
  div.querySelector('div').innerText = msg.message;
  div.querySelector('small').innerText = "By " + msg.nickname;
  div.querySelector('time').innerText = "@ " + new Date(msg.date).toUTCString();
  document.querySelector('#posts')[inserFunctionName](div);
}

setUpPublishNewMessage();

// Get and show messages
useMessages(getLocationName()).map().once(function (msg, id) {
  if (!msg) {
    console.debug('No message arrived:', msg, id);
    return;
  }
  msg.message && insertMessageIntoDom(msg, id);
});

if (getLocationName()) {
  // Update title based on current scope
  const [lat, lon] = getLocationName().split(',');
  if (lon) {
    document.querySelector('h1').innerText += ` ${lat}°, ${lon}°`;
  } else {
    document.querySelector('h1').innerText = `· ${getLocationName()} ·`;
  }
} else {

}

console.info('Location ~ ', getLocationName());
