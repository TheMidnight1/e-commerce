import { writable } from "svelte/store";
import type { ComponentProps, SvelteComponent } from "svelte";

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type Constructor<TInstance> = new (...args: unknown[]) => TInstance;

type ToastContent<TComponent extends SvelteComponent> =
  | { message: string }
  | { html: string }
  | {
      component: Constructor<TComponent>;
      props: ComponentProps<TComponent>;
    };

export type Toast = {
  timeout: number;
  createdAt: number;
  id: number | string;
  dismissable: boolean;
  type: "success" | "error" | "warning" | "info" | "loading";
} & ToastContent<SvelteComponent>;

export const timeouts = new Map<Toast["id"], ReturnType<typeof setTimeout>>();
export const toasts = writable<Array<Toast>>([]);

const getDefaultOptions = () => ({
  timeout: 4000,
  id: Date.now(),
  dismissable: true,
  createdAt: Date.now(),
  position: "bottom-right"
});

export const toast = {
  show<TComponent extends SvelteComponent>(t: AtLeast<Toast, "type"> & ToastContent<TComponent>) {
    const newToast = { ...getDefaultOptions(), ...t };
    if (newToast.type === "loading") {
      newToast.timeout = Infinity;
    }

    clearTimeout(timeouts.get(newToast.id));
    toasts.update(($toasts) => {
      const filtered = $toasts.filter((t) => t.id !== newToast.id);
      return [newToast, ...filtered];
    });

    if (newToast.timeout !== Infinity) {
      const timeoutId = setTimeout(() => toast.remove(newToast.id), newToast.timeout);
      timeouts.set(newToast.id, timeoutId);
    }

    return newToast.id;
  },
  remove(id: string | number) {
    toasts.update(($toasts) => $toasts.filter((t) => t.id !== id));
    clearTimeout(timeouts.get(id));
    timeouts.delete(id);
  },
  removeAll() {
    for (const id of timeouts.values()) clearTimeout(id);
    timeouts.clear();
    toasts.set([]);
  }
};
