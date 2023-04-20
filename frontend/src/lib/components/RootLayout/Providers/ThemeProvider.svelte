<script lang="ts">
  import { onMount } from "svelte";
  import { appTheme, type AppTheme } from "$lib/stores/appTheme";

  export const theme: Partial<AppTheme> | undefined = {};
  if (theme) appTheme.update((t) => ({ ...t, ...theme }));

  let mode = $appTheme.mode;
  const media = "(prefers-color-scheme: dark)";

  // prettier-ignore
  const themeScript = `<${"script"}>!function() {var t="${mode}";var r=document.documentElement;var th=t;if(th==="system"){th=window.matchMedia("${media}").matches?"dark":"light"};r.style.setProperty("color-scheme", th);r.classList.toggle("dark", th==="dark");}()</${"script"}>`;

  const handleChange = (e: any) => {
    mode = e.matches ? "dark" : "light";
    document.documentElement.classList.toggle("dark", e.matches);
    document.documentElement.style.setProperty("color-scheme", mode);
  };

  onMount(() => {
    const darkScheme = window.matchMedia(media);

    const unsubscribe = appTheme.subscribe(($theme) => {
      if ($theme.mode === "system") {
        handleChange(darkScheme);
        darkScheme.addEventListener("change", handleChange);
      } else {
        mode = $appTheme.mode;
        darkScheme.removeEventListener("change", handleChange);
      }
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html themeScript}
</svelte:head>

<div id="theme-provider" class={mode} style:color-scheme={mode}>
  <slot />
</div>
