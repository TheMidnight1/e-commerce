import "@total-typescript/ts-reset";

declare global {
  namespace App {
    interface Error {
      message: string;
      errorId: string;
    }
    interface Locals {
      sid: string;
      currentUser: import("$lib/services/AuthService").TCurrentUser;
    }
    interface PageData {
      currentUser: import("$lib/services/AuthService").TCurrentUser;
      flash?: {
        id?: string;
        message: string;
        type: "info" | "success" | "error" | "warning" | "loading";
      };
    }
  }

  namespace svelte.JSX {
    type Direction = "top" | "right" | "bottom" | "left";

    interface HTMLAttributes {
      onswiping: (event: CustomEvent<{ dx: number; dy: number; direction: Direction }>) => void;
      onswipeend: (event: CustomEvent) => void;
    }
  }
}

export {};
