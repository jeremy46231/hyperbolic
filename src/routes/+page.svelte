<script>
  import SpotChallenge from '$lib/SpotChallenge.svelte'

  const challenges = [
    {
      component: SpotChallenge,
    },
    {
      component: SpotChallenge,
    },
  ]

  let currentChallengeIndex = $state(0)
  let currentChallenge = $derived(challenges[currentChallengeIndex])

  let done = $state(false)

  const nextChallenge = () => {
    console.log('next')
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