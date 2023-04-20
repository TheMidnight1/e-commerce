import { writable } from "svelte/store";
import type { TCurrentUser } from "$lib/services/AuthService";

export const currentUser = writable<TCurrentUser>(undefined);
