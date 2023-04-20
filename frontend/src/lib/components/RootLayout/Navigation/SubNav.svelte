<script lang="ts">
  import { page } from "$app/stores";
  import { createEventDispatcher } from "svelte";
  import { deserialize, applyAction } from "$app/forms";
  import { updateFlash } from "sveltekit-flash-message/client";

  import { appTheme } from "$lib/stores/appTheme";
  import { currentUser } from "$lib/stores/authStore";

  const dispatch = createEventDispatcher();

  const handleLogout = async () => {
    if (!confirm("Do you really want to logout from your account?")) return;

    const response = await fetch("/auth/logout", {
      method: "POST",
      body: new FormData()
    });

    await updateFlash(page);
    const result = deserialize(await response.text());

    if (result.type == "redirect") {
      $currentUser = undefined;
      dispatch("close");
    }

    applyAction(result);
  };
</script>

<button
  on:click={() => appTheme.changeMode()}
  class="hover:bg-primary-600 group relative flex w-full items-center rounded-lg px-3 py-2 font-medium dark:text-gray-300 [.nav-dark_&]:text-gray-300 !hover:text-white">
  <i class="i-bi-palette mr-3 text-xl" />
  <span>Toggle Theme</span>
  <small class="ml-auto text-[8px] uppercase text-gray-500 group-hover:text-white"
    >{$appTheme.mode}</small>
</button>

<a
  href="/settings/account"
  on:click={() => dispatch("close")}
  class="hover:bg-primary-600 flex w-full items-center rounded-lg px-3 py-2 font-medium dark:text-gray-300 [.nav-dark_&]:text-gray-300 !hover:text-white">
  <i class="i-bi-gear-wide-connected mr-3 text-xl" />
  <span>Account &amp; Settings</span>
</a>

<a
  href="/login/saved-accounts"
  class="hover:bg-primary-600 flex w-full items-center rounded-lg px-3 py-2 font-medium dark:text-gray-300 [.nav-dark_&]:text-gray-300 !hover:text-white">
  <i class="i-bi-arrow-repeat mr-3 text-xl" />
  <span>Switch Account</span>
</a>

<form method="post" action="/logout" on:submit|preventDefault={handleLogout}>
  <button
    type="submit"
    class="flex w-full items-center rounded-lg px-3 py-2 text-base font-medium dark:text-gray-300 hover:bg-red-500 [.nav-dark_&]:text-gray-300 !hover:text-white">
    <i class="i-bi-box-arrow-left mr-3 text-xl" />
    <span>Logout</span>
  </button>
</form>
