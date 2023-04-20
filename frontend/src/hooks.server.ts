import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { pick } from "$lib/utilities/functions";

const HEADERS_FIELDS = ["host", "connection", "accept-encoding", "accept-language"];

const getDeviceId: Handle = async ({ resolve, event }) => {
  const headers = pick(Object.fromEntries(event.request.headers), HEADERS_FIELDS);
  const data = new TextEncoder().encode(JSON.stringify(headers));
  const buffer = await crypto.subtle.digest("SHA-1", data);

  event.locals.sid = [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

  return await resolve(event);
};

export const handle = sequence(getDeviceId);
