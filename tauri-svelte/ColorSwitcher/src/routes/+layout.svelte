<script lang="ts">
  import '../app.css';

  // Pull the layout children directly from SvelteKit's routing map
  let { children } = $props();
</script>

{@render children()}
