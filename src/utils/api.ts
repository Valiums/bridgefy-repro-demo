const BASE_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

export async function login(payload: {
  username: string;
  password: string;
}): Promise<any> {
  const data = {
    ...payload,
  };
  const keys = Object.keys(data);
  let datastr = '';
  keys.forEach((key) => {
    // @ts-ignore
    datastr += `${key}=${encodeURIComponent(data[key])}&`;
  });
  const res = await fetch(`https://www.google.com/`, {
    method: 'POST',
    body: datastr,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  }).then((j) => j.json());
  return res;
}

// function put(url: string, data = {}) {
//   return _fetch(config.apiURL + url, {
//     method: 'PUT',
//     headers: getHeaders(),
//     body: JSON.stringify(data),
//   });
// }

// async function del(url: string, params = {}) {
//   const queryString = '?' + querystring.stringify(params);
//   const headers = await getHeaders();
//   return _fetch(config.apiURL + url + queryString, {
//     method: 'DELETE',
//     headers,
//   });
// }

// function post(url: string, data = {}) {
//   return _fetch(config.apiURL + url, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(data),
//   });
// }

async function get(url: string, params = {}) {
  // const queryString = '?' + querystring.stringify(params);
  const queryString = '';
  const headers = await getHeaders();

  return _fetch(url + queryString, {
    method: 'GET',
    headers,
  });
}

async function _fetch(url: string, options: any) {
  const res = await fetch(url, options);

  if (res.status >= 400) {
    const resJson = await res.json();
    throw resJson.error;
  }
  return res.json();
}

function getHeaders(noAuthorization = false) {
  return BASE_HEADERS;
}
