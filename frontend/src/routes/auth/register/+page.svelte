<script lang="ts">
  import { NavLink } from "$lib/components/Navigation";
</script>

<div class="h-full w-full">
  <div class="w-full md:max-w-md flex flex-col mx-auto px-6 md:py-6 select-none">
    <div class="mx-auto text-center mt-5">
      <h1 class="text-4xl font-dancingScript text-primary-500 dark:text-primary-400">ECommerce</h1>
      <h2>Welcome to login</h2>
    </div>

    <div
      class="bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-white dark:border-gray-700 shadow inline-flex items-center my-4 p-0.5 space-x-1.5">
      <NavLink
        exact
        href="/auth/login"
        activeclass="bg-white dark:bg-gray-700 text-primary-500 dark:text-primary-400 font-medium border border-white dark:border-0"
        class="w-full rounded-lg py-1.5 text-center text-md">Login</NavLink>
      <NavLink
        exact
        href="/auth/register"
        activeclass="bg-white dark:bg-gray-700 text-primary-500 dark:text-primary-400 font-medium border border-white dark:border-0"
        class="w-full rounded-lg py-1.5 text-center text-md">Register</NavLink>
    </div>

    <div class="py-2">
      <div class="flex items-center my-2">
        <div class="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
        <span class="flex-shrink text-sm px-2 text-gray-500 dark:text-gray-200">or</span>
        <div class="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
      </div>
      <div class="inline-flex justify-center items-center w-full space-x-2">
        <a
          href="/oauth/google"
          class="group inline-flex items-center justify-center text-center w-12 h-12 rounded-full bg-white dark:border-2 dark:border-gray-700 dark:bg-dark-700 text-[#DB4437] shadow">
          <i class="i-bi-google w-8 h-8" />
        </a>
        <a
          href="/oauth/facebook"
          class="inline-flex items-center justify-center text-center w-12 h-12 rounded-full bg-white dark:border-2 dark:border-gray-700 dark:bg-dark-700 text-[#4267B2] shadow">
          <i class="i-bi-facebook w-8 h-8" />
        </a>
      </div>
    </div>
  </div>
</div>
