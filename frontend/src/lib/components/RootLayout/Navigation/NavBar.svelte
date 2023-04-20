<script lang="ts">
  import { afterNavigate } from "$app/navigation";

  import SubNav from "./SubNav.svelte";
  import { navlinks } from "./utilities";
  import { appTheme } from "$lib/stores/appTheme";
  import { clickAway } from "$lib/actions/clickAway";
  import { currentUser } from "$lib/stores/authStore";
  import { NavLink } from "$lib/components/Navigation";

  // prettier-ignore
  let navOpened = false, subNavOpened = false;

  const toggleNavBar = () => {
    navOpened = !navOpened;
  };

  const closeNav = () => {
    navOpened = false;
  };

  const toggleSubNav = () => {
    subNavOpened = !subNavOpened;
  };

  const closeSubNav = () => {
    subNavOpened = false;
  };

  afterNavigate(() => {
    navOpened = false;
    subNavOpened = false;
  });
</script>

<nav
  use:clickAway={closeNav}
  class="nav-{$appTheme.navTheme} flex select-none flex-wrap items-center border-b border-gray-300 py-1.5 pl-4 pr-2 z-10 md:flex-nowrap dark:(bg-black border-gray-700)"
  class:bg-white={$appTheme.navTheme === "light"}
  class:bg-gray-800={$appTheme.navTheme === "dark"}
  class:disabled={!$currentUser}>
  <div class="ml-2 mr-8 h-10 w-10">
    <img alt="" src="/app-logo.svg" class="h-10 w-10" />
  </div>

  <div class="ml-auto inline-flex items-center space-x-2 md:order-2">
    <a
      href="/cart"
      class="inline-flex items-center justify-center w-7 h-7 rounded-full focus:(ring-2 ring-black) [.nav-dark_&]:(text-gray-400 hover:text-white focus:ring-white) dark:focus:ring-white">
      <i class="i-bi-cart3 h-5 w-5" />
    </a>

    <a
      href="/notifications"
      class="inline-flex items-center justify-center w-6.5 h-6.5 rounded-full focus:(ring-2 ring-black) [.nav-dark_&]:(text-gray-400 hover:text-white focus:ring-white) dark:focus:ring-white">
      <i class="i-heroicons-bell rotate-15 h-6 w-6" />
    </a>

    <button
      on:click={toggleNavBar}
      class="inline-flex items-center justify-center rounded-md px-2 py-1 md:hidden hover:bg-gray-100 focus:(outline-none ring-2.2 ring-black) [.nav-dark_&]:(focus:ring-white text-gray-400 hover:bg-gray-700 hover:text-white) dark:(hover:bg-dark-700 focus:ring-white)">
      <i class="w-8 h-8 {navOpened ? 'i-bi-x' : 'i-bi-list'}" />
    </button>

    {#if $currentUser}
      <div class="relative hidden md:inline-flex" use:clickAway={closeSubNav}>
        <button
          on:click={toggleSubNav}
          class="relative ml-2 hidden h-9 w-9 items-center justify-center rounded-full outline-none focus:(ring-2 ring-black) [.nav-dark_&]:focus:ring-white dark:focus:ring-white md:inline-flex">
          <img alt="" class="hw-full rounded-full" src={$currentUser.picture} />
        </button>
        <div
          class="min-w-60 absolute right-0 top-8 p-1 z-200 rounded-lg shadow border bg-white [.nav-dark_&]:(bg-gray-900 border-0) !dark:(bg-black border-dark-700)"
          class:block={subNavOpened}
          class:hidden={!subNavOpened}>
          <SubNav on:close={closeSubNav} />
        </div>
      </div>
    {/if}
  </div>

  <div
    class:flex={navOpened}
    class:hidden={!navOpened}
    class="nav-links mt-1 basis-full flex-col space-y-1 md:order-1 md:mt-0 md:flex md:flex-row md:space-x-1 md:space-y-0">
    {#each navlinks as link (link.href)}
      <NavLink
        href={link.href}
        exact={link.href === "/"}
        activeclass="!bg-gray-200 !text-black ![.nav-dark_&]:(bg-gray-900 text-white) !dark:(bg-dark-700 text-white) !dark:[.nav-dark_&]:(bg-dark-700 text-white)"
        class="block rounded-md px-3 py-1.5 text-base font-medium text-gray-800 hover:(bg-gray-100 text-black) [.nav-dark_&]:(text-gray-200 hover:text-white hover:bg-gray-700) dark:(text-gray-300 hover:text-white hover:bg-dark-900)">
        <i class="{link.icon} mr-3 h-5 w-5 md:hidden" />
        <span>{link.title}</span>
      </NavLink>
    {/each}

    {#if $currentUser}
      <div class="p-1 md:hidden">
        <div class="flex items-center">
          <div
            class="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
            <img alt="" src={$currentUser.picture} class="h-9 w-9 rounded-full" />
          </div>
          <div class="ml-3 text-transparent">
            <div
              class="text-base font-medium leading-none text-black [.nav-dark_&]:text-white dark:text-white">
              {$currentUser.name}
            </div>
            <div class="text-primary-600 text-sm font-medium leading-none hover:underline">
              @{$currentUser.username}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <SubNav />
        </div>
      </div>
    {/if}
  </div>
</nav>
