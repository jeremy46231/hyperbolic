<script lang="ts">
  import { onMount } from 'svelte'

  const { onNext } = $props()

  let windowObj: Window | null = $state(null)
  onMount(() => {
    windowObj = window
  })

  function colorRandomDot(node: HTMLElement) {
    const dots = node.children
    const randomDot = dots[
      Math.floor(Math.random() * dots.length)
    ] as HTMLDivElement
    randomDot.style.filter = 'hue-rotate(13deg)'
    randomDot.onclick = () => {
      onNext()
    }
  }
</script>

{#if windowObj}
  <div id="dot-container" use:colorRandomDot>
    {#each Array(Math.floor(windowObj.innerHeight / 60)) as _, rowIdx}
      {#each Array(Math.floor(windowObj.innerWidth / 62)) as _, colIdx}
        <div
          class="dot"
          style="top: {rowIdx * 63 + 10}px; left: {colIdx * 62 + 10}px;"
        ></div>
      {/each}
    {/each}
  </div>
{/if}

<style>
  #dot-container {
    overflow: hidden;
    padding: 10px;
  }

  .dot {
    position: absolute;
    background-color: #3498db;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .dot:hover {
    transform: scale(1.3);
    transition-duration: 75ms;
  }
</style>
