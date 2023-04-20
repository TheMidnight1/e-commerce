<script lang="ts">
  import { clsx } from "clsx";
  import { scale } from "svelte/transition";

  import { swipe } from "$lib/actions/swipe";
  import { toasts, toast, timeouts, type Toast } from "$lib/utilities/toast";

  const handleToastPause = (t: Toast) => {
    clearTimeout(timeouts.get(t.id));
    if (t.timeout !== Infinity) {
      const newTimeout = t.timeout - (Date.now() - t.createdAt);
      t.timeout = newTimeout > 0 ? newTimeout : 0;
    }
  };

  const handleToastResume = (t: Toast) => {
    if (t.timeout !== Infinity) {
      const timeoutId = setTimeout(() => toast.remove(t.id), t.timeout || 300);
      timeouts.set(t.id, timeoutId);
    }
  };

  const handleSwipe = (e: any, t: Toast) => {
    if (t.timeout !== Infinity && t.dismissable) {
      const dx = e.detail.dx;
      e.target.style.transform = `translateX(${dx}px)`;
      e.target.style.opacity = (100 - Math.abs(dx)) / 100;

      if (Math.abs(dx) > 140) {
        e.target.style.display = "none";
        toast.remove(t.id);
      }
    } else {
      e.target.classList.remove("animate-shakeX");
    }
  };

  const handleSwipeEnd = (e: any, t: Toast) => {
    if (!t.dismissable || t.timeout === Infinity) {
      e.target.classList.add("animate-shakeX");
    } else {
      e.target.style.transform = "none";
      e.target.style.opacity = 100;
    }
  };
</script>

<div
  class="fixed bottom-0 inset-x-0 w-full z-100 flex flex-col-reverse px-2 select-none pointer-events-none">
  {#each $toasts as t (t.id)}
    <div
      use:swipe
      on:swiping={(e) => handleSwipe(e, t)}
      on:swipeend={(e) => handleSwipeEnd(e, t)}
      class="mx-auto bg-white border border-t-gray-200 shadow-lg rounded-lg px-4 py-2 flex items-center break-all my-1 pointer-events-auto dark:bg-black dark:text-white dark:border-gray-700/80"
      transition:scale={{ duration: 400 }}
      on:mouseenter={() => handleToastPause(t)}
      on:touchstart={() => handleToastPause(t)}
      on:mouseleave={() => handleToastResume(t)}
      on:touchend={() => handleToastResume(t)}>
      {#if t.type}
        <i
          class={clsx("w-5 h-5 mr-2.5", {
            "i-svg-spinners:ring-resize": t.type === "loading",
            "i-bi-x-circle-fill text-red-500": t.type === "error",
            "i-bi-info-circle-fill text-blue-500": t.type === "info",
            "i-bi-check-circle-fill text-green-500": t.type === "success",
            "i-bi-exclamation-circle-fill text-orange-500": t.type === "warning"
          })} />
      {/if}

      <div class="sm:max-w-sm tracking-tight text-gray-700 dark:text-gray-200 dark:font-medium">
        {#if "component" in t}
          <svelte:component this={t.component} {...t.props} />
        {:else if "html" in t}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html t.html}
        {:else}
          {t.message}
        {/if}
      </div>
    </div>
  {/each}
</div>
