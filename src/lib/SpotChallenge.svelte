<script lang="ts">
  import { onMount } from "svelte";

  const { onNext } = $props();

  let windowObj: Window | null = $state(null);
  onMount(async () => {
    windowObj = window;
  });

  const dotMounted = (dot: HTMLButtonElement) => {
    const maxX = window.innerWidth - dot.offsetWidth;
    const maxY = window.innerHeight - dot.offsetHeight;

    // move div to a random place on screen within the viewport
    dot.style.left = Math.floor(Math.random() * (maxX + 1)) + "px";
    dot.style.top = Math.floor(Math.random() * (maxY + 1)) + "px";
  };

  const dotClicked = () => {
    onNext();
  };
</script>

<div class="container">
  {#if windowObj}
    <button
      class="dot"
      use:dotMounted
      onclick={dotClicked}
      aria-label="very secret dot"
    ></button>
  {/if}
</div>

<style>
  .dot {
    position: absolute;
    background: radial-gradient(circle, #4699db 40%, transparent 100%);
    border: none;
    width: 60px;
    height: 60px;
    margin: 2px;
    border-radius: 50%;
  }
</style>
