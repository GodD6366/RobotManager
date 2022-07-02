export async function doFetch(route) {
  return await fetch(location.origin + route);
}

export async function get(route: string) {
  return await fetch(`${location.origin}/api/${route}`);
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
