export async function doFetch(route) {
  return await fetch(location.origin + route);
}

export async function get(route: string) {
  return await fetch(`${location.origin}/api/${route}`);
}

export async function $get(route: string) {
  const result = await fetch(`${route}`);
  const res = await result.json();
  return res.data;
}
export async function $post(route: string, data: Record<string, any>) {
  const result = await fetch(`${route}`, {
    method: 'post',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  const res = await result.json();
  return res.data;
}

export async function post(route: string, data: Record<string, any>) {
  return await fetch(`${location.origin}/api/${route}`, {
    method: 'post',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}
