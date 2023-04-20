export function omit<T, Key extends keyof T>(data: T, keys: Key[]): Omit<T, Key> {
  const newData = Object.assign({}, data);
  for (const key of keys) delete newData[key];
  return newData;
}

export function pick<T, Key extends keyof T>(data: T, keys: Key[]): Pick<T, Key> {
  const newData = Object.assign({});
  for (const key of keys) newData[key] = data[key];
  return newData;
}

export function ensureRole(currentRole: string, requiredRoles: string[]) {
  const roles = ["developer"].concat(requiredRoles);
  return roles.includes(currentRole);
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replaceAll("-", "+").replaceAll("_", "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
