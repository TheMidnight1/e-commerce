import { writable } from "svelte/store";

export type AppTheme = {
  primary: "blue" | "purple";
  navTheme: "light" | "dark";
  mode: "light" | "dark" | "system";
};

const MODES = ["light", "dark", "system"];

function createStore() {
  const { update, subscribe } = writable<AppTheme>({
    mode: "system",
    primary: "blue",
    navTheme: "light"
  });

  function changeMode(mode?: AppTheme["mode"]) {
    update((t) => {
      if (!mode) {
        mode = (MODES[MODES.indexOf(t.mode) + 1] || "light") as AppTheme["mode"];
      }
      return { ...t, mode };
    });
  }

  return { update, changeMode, subscribe };
}

export const appTheme = createStore();
