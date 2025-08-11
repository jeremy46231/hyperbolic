<script lang="ts">
  import SpotChallenge from '$lib/SpotChallenge.svelte'
  import SquareChallenge from '$lib/SquareChallenge.svelte'
  import DotChallenge from '$lib/DotChallenge.svelte'
  import TextChallenge from '$lib/TextChallenge.svelte'
  import JSConfetti from 'js-confetti'
  import { onMount } from 'svelte'

  const challenges = [
    {
      component: TextChallenge,
    },
    {
      component: SquareChallenge,
    },
    {
      component: SpotChallenge,
    },
    {
      component: DotChallenge,
    },
  ]

  let jsConfetti: JSConfetti
  onMount(() => {
    jsConfetti = new JSConfetti()
    return () => {
      jsConfetti.destroyCanvas()
    }
  })

  let currentChallengeIndex = $state(0)
  let currentChallenge = $derived(challenges[currentChallengeIndex])

  let done = $state(false)

  const nextChallenge = () => {
    console.log('next')

    currentChallengeIndex++
    if (currentChallengeIndex >= challenges.length) {
      done = true
      for (const ms of [0, 200, 400, 800, 1000]) {
        setTimeout(() => {
          jsConfetti.addConfetti({
            confettiNumber: 2_000,
          })
        }, ms)
      }
    } else {
      jsConfetti.addConfetti({
        confettiNumber: 100 + 400 * currentChallengeIndex,
      })
    }
  }
</script>

{#if !done}
  {#key currentChallengeIndex}
    <currentChallenge.component onNext={nextChallenge} />
  {/key}
{:else}
  <div class="done-message">All challenges completed!</div>
{/if}
