const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    "Content-type": 'application/json',
    "Authorization": 'cf500f44-d398-4011-ab19-e99e08530bfe'
  }
}

function onResponce(res){
  console.log(res);
  return res.ok ? res.json() : Promise.reject('Сервер не доступен')
}
export function getUser() {
  return fetch(`${config.url}/users/me`,
  {
      method: "GET",
      headers: config.headers
  })
      .then(onResponce)
}

export function editUser(data) {
  return fetch(`${config.url}/users/me`,
    {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(data)
    })
      .then(onResponce)
}

export function getMassiveCard(data) {
  return fetch(`${config.url}/cards`,
    {
      headers: config.headers,
    })
      .then(onResponce)
}

export function getUsernCards() {
  return Promise.all([getUser(), getMassiveCard()])
}

export function addCardPic(data) {
  return fetch(`${config.url}/cards`, 
  {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
      idCard: data._id
    })
  })
    .then(onResponce)
}

export function deleteCardPic(idCard) {
  return fetch(`${config.url}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(onResponce)
}

export function changeLikes(idCard, unliked) {
  return fetch(`${config.url}/cards/likes/${idCard}`, {
    method: (unliked ? "PUT" : "DELETE"),
    headers: config.headers
  })
  .then(onResponce)
}

export function avatarPic(ava) {
  return fetch(`${config.url}/users/me/avatar`,
    {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(ava)
    })
      .then(onResponce)
}