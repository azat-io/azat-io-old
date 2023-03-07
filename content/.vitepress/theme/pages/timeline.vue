<script lang="ts" setup>
import Container from '~/components/container.vue'

let today = new Date()
let dateOfBirth = new Date('1992-02-16')
let healthyLifeExpectancy = 60.7
let lifeExpectancyAtBirth = 68.2

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
</script>

<template>
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
    </div>
    <div :class="$style.timeline">
      <div
        v-for="index in Math.floor(lifeExpectancyAtBirth * 52)"
        :key="index"
        :class="{
          [$style.element]: true,
          [$style.passed]: livedWeeks > index,
          [$style.healthy]: healthyLifeExpectancy * 52 > index,
          [$style.counter]: index % (52 * 4) === 0,
        }"
      />
    </div>
  </Container>
</template>

<style module>
.title {
  margin-block-start: 0;
}

.examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-s);
  margin-block-end: var(--space-xl);
}

.examples p {
  margin: 0;
}

.example {
  display: inline-block;
  inline-size: 16px;
  block-size: 16px;
  border-radius: 2px;
}

.hale-example {
  background: var(--color-background-inverted);
}

.leb-example {
  background: var(--color-background-inverted);
  opacity: 80%;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-auto-rows: 1fr;
  gap: 1px;
  padding-inline-end: var(--space-m);
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
  inline-size: 100%;
  padding-block-end: 100%;
  content: '';
}

.passed {
  background: var(--color-background-brand);
}

.healthy {
  opacity: 100%;
}

.counter::after {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: calc(100% + var(--space-xs));
  font: var(--font-xs);
  content: counter(year);
  transform: translateY(-50%);
}

.info {
  margin-block: var(--space-xs);
  font: var(--font-s);
}

@media (width >= 720px) {
  .examples {
    grid-template-columns: 1fr 1fr;
  }

  .timeline {
    gap: 3px;
  }

  .element {
    border-radius: 2px;
  }
}
</style>
