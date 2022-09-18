import { useMessages } from '../api/use-gun.js'

function getSearchQueryString(key) {
  return new URLSearchParams(location.search).get(key);
}

function getContextName(contextSearchParam = 'context') {
  return getSearchQueryString(contextSearchParam);
}

function setUpPublishNewMessage() {
  function formatNewMessage(formData) {
    const message = {}
    const searchParams = new URLSearchParams(location.search);
    for (const [key, value] of formData) {
      message[key] = value;
    }
    message.date = new Date().toISOString();
    message.latitude = searchParams.get('lat');
    message.longitude = searchParams.get('lon');
    return message
  }

  const button = document.querySelector('#create-new-message');
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');

  button.addEventListener('click', () => {
    dialog.showModal();
  })

  dialog.addEventListener("close", function (event) {
    if (dialog.returnValue === 'close') return;
    const message = formatNewMessage(new FormData(form));
    useMessages(getContextName()).set(message);
    form.reset();
  });
};


function insertMessageIntoDom(msg, id, { inserFunctionName = "prepend" } = {}) {
  const div = document.createElement('div');
  div.innerHTML = /*html*/`
    <div></div>
    <small class="nickname"></small>
    <time></time>
  `
  div.classList.add("message");
  div.querySelector('div').innerText = msg.message;
  div.querySelector('small').innerText = msg.nickname;
  div.querySelector('time').innerText = msg.date;
  document.querySelector('#messages')[inserFunctionName](div);
}


setUpPublishNewMessage();

// Get and show messages
useMessages(getContextName()).map().once(function (msg, id) {
  if (!msg) {
    console.debug('No message arrived:', msg, id);
    return;
  }
  insertMessageIntoDom(msg, id);
});

console.log('context', getContextName())