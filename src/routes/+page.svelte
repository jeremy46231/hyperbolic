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
          'As an employee of the hack club I really disapprove of chris walkers recent behaviour. On Friday August 1, I was walking with him from hq to the hcb office and I told him I didn’t like his picture of the toe. Chris immediately started chasing me down with this really pointy presentation pointer. I tried running all the way down shelburne road but he wouldn’t give up. Then I started asking for help and this kind lady pulled up to help. Chris kicked her out of the car and drove the car away. Later I saw several front porch forum posts (vermont’s local neighborhood app) about a rash driver running over kids in the parking lot. Honestly I don’t know what to do anymore. I want chris to write me an apology note and send me a rose',
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

  // Stopwatch state
  let startTime = $state<number | null>(null)
  let endTime = $state<number | null>(null)
  let now = $state(Date.now())
  let elapsed = $derived(startTime ? (endTime ?? now) - startTime : 0)

  function formatElapsed(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  $effect(() => {
    if (startTime && !endTime) {
      const id = setInterval(() => {
        now = Date.now()
      }, 100)
      return () => clearInterval(id)
    }
  })

  const nextChallenge = () => {
    console.log('next')

    currentChallengeIndex++
    // Start stopwatch right after first challenge is completed (i.e., we move from index 0 -> 1)
    if (currentChallengeIndex === 1 && startTime == null) {
      startTime = Date.now()
    }
    if (currentChallengeIndex >= challenges.length) {
      done = true
      if (startTime && !endTime) endTime = Date.now()
      ;(async () => {
        while (true) {
          jsConfetti.addConfetti({
            confettiNumber: 1_000,
          })
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      })()
    } else {
      jsConfetti.addConfetti({
        confettiNumber: 50 + 600 * currentChallengeIndex,
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

{#if startTime}
  <div class="stopwatch">{formatElapsed(elapsed)}</div>
{/if}

<style>
  .stopwatch {
    position: fixed;
    top: 8px;
    right: 12px;
    font:
      600 14px/1.1 ui-monospace,
      SFMono-Regular,
      Menlo,
      monospace;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    padding: 4px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    z-index: 1000;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    user-select: none;
  }
</style>
