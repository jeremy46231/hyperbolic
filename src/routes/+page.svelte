<script lang="ts">
  import SpotChallenge from '$lib/SpotChallenge.svelte'
  import JSConfetti from 'js-confetti'
  import { onMount } from 'svelte'

  const challenges = [
    {
      component: SpotChallenge,
    },
  ]

  let jsConfetti: JSConfetti
  onMount(() => {
    jsConfetti = new JSConfetti()
  })

  let currentChallengeIndex = $state(0)
  let currentChallenge = $derived(challenges[currentChallengeIndex])

  let done = $state(false)

  const nextChallenge = () => {
    console.log('next')
    for (let i = 0; i <= 1 + 3 * currentChallengeIndex; i++) {
      jsConfetti.addConfetti()
    }
    currentChallengeIndex++
    if (currentChallengeIndex >= challenges.length) {
      done = true
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
