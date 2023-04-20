import { setPointerControls } from "svelte-gestures";

export function swipe(node: HTMLElement) {
  const gestureName = "swipe";

  /* prettier-ignore */
  let clientX: number, clientY: number, dx = 0, dy = 0;
  let direction: "top" | "right" | "bottom" | "left" | undefined = undefined;

  const defaultCursor = node.style.cursor;
  const defaultUserSelect = node.style.userSelect;

  function onDown(activeEvents: PointerEvent[], event: PointerEvent) {
    dx = 0;
    dy = 0;
    direction = undefined;
    clientX = event.clientX;
    clientY = event.clientY;
    node.style.cursor = "grabbing";
    node.style.userSelect = "none";
  }

  function onMove(activeEvents: PointerEvent[], event: PointerEvent) {
    if (activeEvents.length === 1) {
      dx = event.clientX - clientX;
      dy = event.clientY - clientY;

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      // (by *2 we eliminate diagonal movements)
      if (absX >= 2 * absY) {
        direction = dx > 0 ? "right" : "left";
      } else if (absY >= 2 * absX) {
        direction = dy > 0 ? "bottom" : "top";
      }

      if (direction) {
        const swipingEvent = new CustomEvent("swiping", {
          detail: { direction, dx, dy }
        });
        node.dispatchEvent(swipingEvent);
      }
    }
  }

  function onUp(_activeEvents: PointerEvent[]) {
    node.style.cursor = defaultCursor;
    node.style.userSelect = defaultUserSelect;

    if (direction) {
      const swipeEndEvent = new CustomEvent("swipeend", {
        detail: { direction, dx, dy }
      });

      node.dispatchEvent(swipeEndEvent);
    }
  }

  return setPointerControls(gestureName, node, onMove, onDown, onUp);
}
