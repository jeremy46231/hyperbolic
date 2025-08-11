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
      props: {
        paragraph:
          "Can you find the word that's different from the others? It might be a little hard to see, but you can do it.",
      },
    },
    {
      component: SpotChallenge,
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
    {
      component: TextChallenge,
      props: {
        paragraph:
          "Shipwrecked is a themed hackathon where you're invited to build creative projects inspired by the idea of being shipwrecked— right on the unique, historic grounds of Cathleen Stone Island. The Bay is a 3-month online event where you will build 4 projects (~15 hours each) that you have always wanted to build. We will host workshops and online coding sprints to help you get there!",
      },
    },
    {
      component: SquareChallenge,
    },
    {
      component: DotChallenge,
    },
    {
      component: TextChallenge,
      props: {
        paragraph:
          "As an employee of the hack club I really disapprove of chris walkers recent behaviour. On Friday August 1, I was walking with him from hq to the hcb office and I told him I didn’t like his picture of the toe. Chris immediately started chasing me down with this really pointy presentation pointer. I tried running all the way down shelburne road but he wouldn’t give up. Then I started asking for help and this kind lady pulled up to help. Chris kicked her out of the car and drove the car away. Later I saw several front porch forum posts (vermont’s local neighborhood app) about a rash driver running over kids in the parking lot. Honestly I don’t know what to do anymore. I want chris to write me an apology note and send me a rose",
      },
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
