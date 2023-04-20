<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  onMount(() => {
    goto(to)
      .then(() => dispatch("redirected"))
      .catch(() => dispatch("error"));
  });

  export let to: string;
</script>
