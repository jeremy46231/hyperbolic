<script lang="ts">
  import { randomHDRColorImage } from '$lib/hdr'
  import { onMount } from 'svelte'

  const { onNext } = $props()

  const hdrImage = randomHDRColorImage()

  const cssFilters = [
    'filter: brightness(0.8);',
    'filter: brightness(1.2);',
    'filter: hue-rotate(10deg);',
    'filter: hue-rotate(-10deg);',
  ]
  const cssFilter = cssFilters[Math.floor(Math.random() * cssFilters.length)]

  const squareCount = 6
  const correctSquare = Math.floor(Math.random() * squareCount)
</script>

<div class="container">
  {#each Array(squareCount) as _, i}
    <button
      class="square"
      style="background-image: url({hdrImage}); {i === correctSquare
        ? cssFilter
        : ''}"
      aria-label="idek"
      onclick={() => {
        if (i === correctSquare) {
          onNext()
        }
      }}
    ></button>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
