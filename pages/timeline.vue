<script lang="ts" setup>
import type { Artist } from '~/typings/artist.js'
import Container from '~/components/container.vue'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import artists from '~/data/artists.json'

let today = new Date()
let dateOfBirth = new Date('1992-02-16')
let healthyLifeExpectancy = 60.7
let lifeExpectancyAtBirth = 68.2
let artistsList = artists as unknown as Artist[]

let getWeeksBetweenDates = (firstDate: Date, secondDate: Date): number => {
  let isLeapYear = (year: number) => new Date(year, 1, 29).getDate() === 29
  let dateDiff = secondDate.getTime() - firstDate.getTime()
  let age = new Date(dateDiff).getUTCFullYear() - 1970
  let ageRemainderInWeeks = Math.floor(
    52 *
      (new Date(firstDate.setFullYear(secondDate.getFullYear())).getTime() /
        (1000 *
          60 *
          60 *
          24 *
          (isLeapYear(secondDate.getUTCFullYear()) ? 366 : 365)) /
        100),
  )
  return age * 52 + ageRemainderInWeeks
}

let livedWeeks = getWeeksBetweenDates(dateOfBirth, today)
let formatDate = (date: string): string =>
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date!))
let celebritiesData = artistsList
  .map(({ born, died, ...data }) => ({
    born: formatDate(born),
    died: formatDate(died),
    livedWeeks: getWeeksBetweenDates(new Date(born), new Date(died)),
    ...data,
  }))
  .sort((a, b) => a.livedWeeks - b.livedWeeks)
</script>

<template>
  <Header />
  <Container>
    <h1 :class="$style.title">Timeline</h1>
    <p>
      My lifetime visualization. Each cell represents one week. There are 52
      weeks in each row, which equals 1 year
    </p>
    <p>
      Life expectancy data based on
      <a
        href="https://cdn.who.int/media/docs/default-source/gho-documents/world-health-statistic-reports/worldhealthstatistics_2022.pdf"
        target="_blank"
        rel="noreferrer"
      >
        World Health Organization monitoring
      </a>
    </p>
    <div :class="$style.examples">
      <p><span :class="[$style.example, $style.passed]" /> - Past week</p>
      <p>
        <span :class="[$style.example, $style['hale-example']]" /> - Healthy
        life expectancy
      </p>
      <p>
        <span :class="[$style.example, $style['leb-example']]" /> - Life
        expectancy at birth
      </p>
      <p>
        <span :class="[$style.example, $style['dead-example']]" v-text="4" />
        - Celebrity death date
      </p>
    </div>
    <div :class="$style.timeline">
      <div
        v-for="index in Math.floor(lifeExpectancyAtBirth * 52)"
        :key="index"
        :class="{
          [$style.element]: true,
          [$style.passed]: livedWeeks > index,
          [$style.healthy]: healthyLifeExpectancy * 52 > index,
          [$style['celebrity-death']]: celebritiesData.some(
            ({ livedWeeks }) => livedWeeks === index,
          ),
          [$style.counter]: index % (52 * 4) === 0,
        }"
      />
    </div>
    <div :class="$style.celebrities">
      <div
        v-for="({ name, description, born, died }, index) in celebritiesData"
        :key="index"
        :class="$style.celebrity"
      >
        <h4 :class="$style['celebrity-title']">
          <span :class="$style.count" v-text="index + 1" />
          {{ name }}
        </h4>
        <p :class="$style.info">Born: {{ born }}</p>
        <p :class="$style.info">Died: {{ died }}</p>
        <p v-text="description" />
      </div>
    </div>
  </Container>
  <Footer />
</template>

<style module>
.title {
  margin-top: 0;
}

.examples {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-s);
  margin-bottom: var(--size-xl);
}

.examples p {
  margin: 0;
}

.example {
  display: inline-block;
  width: var(--size-s);
  height: var(--size-s);
  border-radius: 2px;
}

.hale-example {
  background: var(--color-background-inverted);
}

.leb-example {
  background: var(--color-background-inverted);
  opacity: 80%;
}

.dead-example {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-content-inverted);
  background: oklch(73.11% 0.182 51.69);
}

.timeline {
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 1px;
  padding-right: var(--size-m);
}

.element {
  position: relative;
  background: var(--color-background-inverted);
  border-radius: 1px;
  opacity: 80%;
}

.element:nth-child(52n) {
  counter-increment: year;
}

.element::before {
  display: block;
  width: 100%;
  padding-bottom: 100%;
  content: '';
}

.passed {
  background: var(--color-background-brand);
}

.healthy {
  opacity: 100%;
}

.celebrity-death {
  counter-increment: celebrity;
  background: oklch(73.11% 0.182 51.69);
}

.celebrity-death::after {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-right: -50%;
  font-size: 0.35rem;
  line-height: var(--line-height-xxs);
  color: var(--color-content-inverted);
  content: counter(celebrity);
  transform: translate(-50%, -50%);
}

.counter::after {
  position: absolute;
  top: 50%;
  left: calc(100% + var(--size-xs));
  font-size: 0.5rem;
  line-height: var(--line-height-xxs);
  content: counter(year);
  transform: translateY(-50%);
}

.celebrities {
  display: flex;
  flex-direction: column;
  row-gap: var(--size-m);
  margin-top: var(--size-m);
}

.celebrity-title {
  display: flex;
  column-gap: var(--size-s);
  align-items: center;
}

.count {
  padding: 0 var(--size-xs);
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--color-content-inverted);
  background: oklch(73.11% 0.182 51.69);
  border-radius: var(--size-xxs);
}

.info {
  margin-block: var(--size-xs);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
}

@media (min-width: 720px) {
  .examples {
    grid-template-columns: 1fr 1fr;
  }

  .timeline {
    grid-gap: 3px;
  }

  .element {
    border-radius: 2px;
  }

  .counter::after {
    font-size: var(--font-size-xxs);
  }

  .celebrity-death::after {
    font-size: 0.65rem;
  }
}
</style>
