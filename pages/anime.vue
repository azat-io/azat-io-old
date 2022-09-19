<script lang="ts" setup>
import Container from '~/components/container.vue'
import type { Anime } from '~/typings/anime.js'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import StarIcon from '~/assets/star.svg'
import anime from '~/data/anime.json'

let timeConvert = (totalMinutes: number): string => {
  let hours = totalMinutes / 60
  let rhours = Math.floor(hours)
  let minutes = (hours - rhours) * 60
  let rminutes = Math.round(minutes)
  return (
    (rhours > 0 ? rhours + ' h. ' : '') +
    (rminutes > 0 ? rminutes + ' min. ' : '')
  )
}

let animeList = (anime as unknown as Anime[]).map(
  ({ duration, episodes, ...data }) => ({
    ...data,
    episodes,
    duration,
    time:
      episodes === 1
        ? timeConvert(duration)
        : `${episodes} ep. of ${duration} min.`,
  }),
)

let totalTime = animeList.reduce(
  (accumulator, { duration, episodes }) => accumulator + duration * episodes,
  0,
)
</script>

<template>
  <Header />
  <Container size="l">
    <h1 :class="$style.title">Anime</h1>
    <div :class="$style.list">
      <div
        v-for="{
          name,
          originName,
          image,
          genres,
          score,
          year,
          time,
        } in animeList"
        :key="name"
        :class="$style.element"
      >
        <img
          :class="$style.image"
          :src="image"
          :alt="name"
          width="225"
          height="319"
        />
        <div>
          <span :class="$style.name" v-text="name" />
          <span :class="$style['origin-name']" v-text="originName" />
          <span :class="$style.data" v-text="`Genres: ${genres.join(', ')}`" />
          <span :class="$style.data" v-text="`Duration: ${time}`" />
          <span :class="$style.data" v-text="`Year: ${year}`" />
          <div :class="$style.stars">
            <StarIcon
              v-for="star in 10"
              :key="star"
              :class="{
                [$style.star]: true,
                [$style['star-active']]: star <= score,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <span :class="$style.total" v-text="`Total: ${timeConvert(totalTime)}`" />
  </Container>
  <Footer />
</template>

<style module>
.title {
  margin-top: 0;
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--size-m);
}

.element {
  display: grid;

  /* prettier-ignore */
  grid-template-columns: clamp(5.5rem, 5.0875rem + 1.375vw, 6.1875rem) minmax(0, 1fr);
  grid-gap: var(--size-m);
}

.image {
  height: auto;
}

.name {
  display: block;
  overflow: hidden;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-brand);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.origin-name {
  display: block;
  margin-bottom: var(--size-xs);
  font-size: var(--font-size-xxs);
  line-height: var(--line-height-xxs);
  color: var(--color-text);
}

.data {
  display: block;
  margin-bottom: var(--size-xxs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
}

.stars {
  display: grid;
  grid-template-columns: repeat(10, var(--size-s));
  grid-gap: var(--size-xxs);
}

.star {
  width: var(--size-s);
  height: var(--size-s);
}

.star-active {
  fill: var(--color-text);
}

.total {
  display: block;
  margin-top: var(--size-xl);
}

@media (min-width: 960px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1400px) {
  .list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
