import type { LayoutServerLoad } from "./$types";
import { AuthService } from "$lib/services/AuthService";
import { loadFlash, redirect } from "sveltekit-flash-message/server";

export const load: LayoutServerLoad = async (event) => {
  const flash = loadFlash(event).flash;
  return { flash, currentUser: AuthService.loadCurrentUser(event.locals.sid) };
};
