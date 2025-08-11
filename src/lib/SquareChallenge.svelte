<script lang="ts">
  import { randomHDRColorImage } from '$lib/hdr'
  import JSConfetti from 'js-confetti'
  import { onMount } from 'svelte'

  const { onNext } = $props()

  const hdrImage = randomHDRColorImage()

  let jsConfetti: JSConfetti
  onMount(() => {
    jsConfetti = new JSConfetti()
    return () => {
      jsConfetti.destroyCanvas()
    }
  })

  let windowObj: Window | null = $state(null)
  onMount(async () => {
    windowObj = window
  })

  const cssFilters = [
    'filter: brightness(0.8);',
    'filter: brightness(1.2);',
    'filter: hue-rotate(10deg);',
    'filter: hue-rotate(-10deg);',
  ]
  const cssFilter = cssFilters[Math.floor(Math.random() * cssFilters.length)]

  const squareCount = 6
  const correctSquare = Math.floor(Math.random() * squareCount)

  let disabled = $state(false)
  // if disabled, reenable after 3 seconds
  $effect(() => {
    if (disabled) {
      const timeout = setTimeout(() => {
        disabled = false
      }, 3000)
      return () => clearTimeout(timeout)
    }
  })
</script>

<div class="container">
  {#if windowObj}
    {#each Array(squareCount) as _, i}
      <button
        class="square"
        style="background-image: url({hdrImage}); {disabled
          ? 'opacity: 0.5;'
          : ''} {i === correctSquare ? cssFilter : ''}"
        aria-label="idek"
        onclick={() => {
          if (i === correctSquare) {
            if (!disabled) {
              onNext()
            }
          } else {
            disabled = true
            jsConfetti.addConfetti({
              emojis: ['❌', '🚫', '💥'],
              emojiSize: 50,
              confettiNumber: 300,
            })
          }
        }}
      ></button>
    {/each}
  {/if}
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* center horizontally */
    justify-content: center;
    align-content: space-evenly;
  }

  .square {
    width: 200px;
    height: 200px;
    position: relative;
    background-size: cover;
    background-position: center;
    border: none;
  }
</style>
