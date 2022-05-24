const btn = document.querySelector('button');
const socket = io.connect(document.location.host);
let isCreated = false;

function clickHandler() {
  socket.emit('message', `Message test pour le serveur`);
}

function onNewRealty(realty) {
  const body = document.querySelector('body');
  let ids = [
    'type',
    'address_1',
    'address_2',
    'city',
    'zipcode',
    'surface',
    'nb_rooms',
    'price',
    'description',
  ];

  if (!isCreated) {
    const template = document.querySelector('template');
    const clone = template.content.cloneNode(true);
    let liEl = clone.querySelectorAll('li');
    let i = 0;
    liEl.forEach(li => {
      li.querySelector('div').textContent = realty[ids[i]];
      i++;
    });
    const ulEl = clone.querySelector('ul');
    body.appendChild(ulEl);

    isCreated = true;
  } else {
    let liEl = document.querySelectorAll('li');
    let i = 0;
    liEl.forEach(li => {
      li.querySelector('div').textContent = realty[ids[i]];
      i++;
    });
  }
}

function onLoadHandler() {
  const host = 'http://' + window.location.hostname;
  fetch(`${host}:3000/api/realty`, {
    headers: {
      'x-api-key': 'F0ZSBG3-N1HM4XD-QSGHC5M-819XB29',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response =>
      fetch(`${host}:3000/api/realty/${response.nbRecords}`, {
        headers: {
          'x-api-key': 'F0ZSBG3-N1HM4XD-QSGHC5M-819XB29',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    )
    .then(response => response.json())
    .then(response => onNewRealty(response.records));
}

socket.on('new-realty', onNewRealty);
window.addEventListener('load', onLoadHandler);
btn.addEventListener('click', clickHandler);
