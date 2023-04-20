<script lang="ts">
  import "virtual:uno.css";
  import "../app.css";

  import nProgress from "nprogress";
  import type { LayoutData } from "./$types";
  import { page, navigating } from "$app/stores";
  import { initFlash } from "sveltekit-flash-message/client";

  import { toast } from "$lib/utilities/toast";
  import { currentUser } from "$lib/stores/authStore";
  import { NavBar, BottomNav } from "$lib/components/RootLayout/Navigation";
  import { ThemeProvider, PWAProvider, ToastsProvider } from "$lib/components/RootLayout/Providers";

  const flash = initFlash(page);
  $: if ($flash) toast.show($flash);
  $: $navigating ? nProgress.start() : nProgress.done();

  export let data: LayoutData;

  $: currentUser.set(data.currentUser);
</script>

<ThemeProvider>
  <NavBar />
  <div class="relative h-full overflow-y-auto">
    <slot />
    <ToastsProvider />
  </div>
  <BottomNav />
</ThemeProvider>
