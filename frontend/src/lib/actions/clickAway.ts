import type { Action } from "svelte/action";

export const clickAway: Action<HTMLElement, () => void> = (element, callback) => {
  const onClick = (event: any) => {
    if (typeof callback === "function" && !element.contains(event.target)) {
      callback();
    }
  };
  document.body.addEventListener("mousedown", onClick);

  return {
    update(newCallback) {
      callback = newCallback;
    },
    destroy() {
      document.body.removeEventListener("mousedown", onClick);
    }
  };
};
