<script lang="ts">
  import clsx from "clsx";
  import { page } from "$app/stores";

  export let href: string;
  let className: string | undefined = undefined;
  export let exact: boolean | undefined = false;
  export let activeclass: string | undefined = undefined;

  export { className as class };

  $: active = exact ? $page.url.pathname === href : $page.url.pathname.includes(href);
</script>

<a
  {href}
  {...$$restProps}
  aria-current={active ? "page" : undefined}
  class={clsx(className, { [`${activeclass}`]: active && activeclass })}>
  <slot />
</a>
