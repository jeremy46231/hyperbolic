<script lang="ts">
  import { randomHDRColorImage } from '$lib/hdr'

  const defaultParagraph = `High dynamic range color perception is a playful test of subtle luminance and chroma differences hidden in a vibrant spectrum.`
  const { onNext, paragraph = defaultParagraph } = $props()

  const hdrImage = randomHDRColorImage()

  // Pick a random word index
  const words = paragraph.split(' ')
  const targetIndex = Math.floor(Math.random() * words.length)

  // Slight variants to apply to the target span so the player must locate it
  const variants = [
    'filter: brightness(1.2);',
    'filter: brightness(0.8);',
    'filter: hue-rotate(12deg);',
    'filter: hue-rotate(-12deg);'
  ]
  const variant = variants[Math.floor(Math.random() * variants.length)]

  const handleClick = (idx: number) => {
    if (idx === targetIndex) {
      onNext()
    }
  }
</script>

<p class="challenge-text">
  {#each words as word, i}
    <button
      type="button"
      class="word {i === targetIndex ? 'target' : ''}"
      style="background-image: url({hdrImage}); {i === targetIndex ? variant : ''}"
      onclick={() => handleClick(i)}
    >{word}</button>{#if i < words.length - 1}&nbsp;{/if}
  {/each}
</p>

<style>
  .challenge-text {
    font-size: clamp(1.2rem, 2.2vw + 0.5rem, 2.75rem);
    font-family: system-ui, sans-serif;
    line-height: 1.3;
    font-weight: 600;
    padding: 6vh 8vw;
    margin: 0;
    user-select: none;
  }
  .word {
    cursor: pointer;
    background-size: cover;
    background-position: center;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: filter 120ms ease, transform 120ms ease;
    display: inline-block;
    border: none;
    padding: 0;
    font: inherit;
    background-color: transparent;
  }
  .word:hover {
    transform: translateY(-2px);
  }
  .word:active {
    transform: scale(0.94);
  }
  .target {
    /* Provide a subtle accessibility affordance on focus (keyboard nav) */
    outline: none;
  }
  .target:focus-visible {
    text-decoration: underline dotted;
  }
</style>
