<script lang="ts">
  import { onMount } from 'svelte'
  import { randomColor } from '$lib/color'

  const { onNext } = $props()

  // Use a single random background color instead of an HDR image
  const backgroundColor = randomColor()

  let windowObj: Window | null = $state(null)
  onMount(async () => {
    windowObj = window
  })

  const dotMounted = (dot: HTMLButtonElement) => {
    const maxX = window.innerWidth - dot.offsetWidth
    const maxY = window.innerHeight - dot.offsetHeight

    // move div to a random place on screen within the viewport
    dot.style.left = Math.floor(Math.random() * (maxX + 1)) + 'px'
    dot.style.top = Math.floor(Math.random() * (maxY + 1)) + 'px'
  }

  const dotClicked = () => {
    onNext()
  }
</script>

<div class="container" style="background-color: {backgroundColor};">
  {#if windowObj}
    <button
      class="dot"
      use:dotMounted
      onclick={dotClicked}
      aria-label="very secret dot"
      tabindex="-1"
    ></button>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .dot {
    position: absolute;
    /* Darkening effect: a soft radial gradient of semi-transparent black. */
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.03) 40%,
      rgba(0, 0, 0, 0) 100%
    );
    /* Multiply ensures it darkens regardless of underlying hue without adding a color cast. */
    mix-blend-mode: multiply;
    border: none;
    width: 60px;
    height: 60px;
    margin: 2px;
    border-radius: 50%;
    padding: 0;
  }
</style>
