<script lang="ts">
  import SpotChallenge from '$lib/SpotChallenge.svelte'
  import SquareChallenge from '$lib/SquareChallenge.svelte'
  import DotChallenge from '$lib/DotChallenge.svelte'
  import TextChallenge from '$lib/TextChallenge.svelte'
  import JSConfetti from 'js-confetti'
  import { onMount, type Component } from 'svelte'

  const challenges: {
    component: Component<{
      onNext: () => void
    }>
    props?: Record<string, any>
  }[] = [
    {
      component: TextChallenge,
      // props: {
      //   paragraph:
      //     "Can you find the word that's different from the others? It might be a little hard to see, but you can do it.",
      // },
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
    <currentChallenge.component
      onNext={nextChallenge}
      {...currentChallenge.props ?? {}}
    />
  {/key}
{:else}
  <div class="done-message">All challenges completed!</div>
{/if}
