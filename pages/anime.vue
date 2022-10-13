<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed, ref } from 'vue'

import type { Anime, Genre } from '~/typings/anime.js'
import Container from '~/components/container.vue'
import SortDownIcon from '~/icons/sort-down.svg'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Select from '~/components/select.vue'
import StarIcon from '~/icons/star.svg'
import Tag from '~/components/tag.vue'
import anime from '~/data/anime.json'

type FormattedAnime = Anime & {
  time: string
}

type SortFunctionName =
  | 'sort-by-duration'
  | 'sort-by-name'
  | 'sort-by-score'
  | 'sort-by-year'

let t = useThemeLocaleData<
  {
    sort: string
  } & {
    // eslint-disable-next-line no-unused-vars
    [_key in SortFunctionName]: string
  }
>()

let selectedGenres = ref<Genre[]>([])

let selectedSorting = ref(null)

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

let formattedAnimeList: FormattedAnime[] = (anime as unknown as Anime[]).map(
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

let animeGenres = Array.from(
  formattedAnimeList
    .reduce(
      (accumulator, { genres }) => new Set([...accumulator, ...genres]),
      new Set<Genre>(),
    )
    .values(),
).sort((a, b) => a.localeCompare(b))

let sortFunc: {
  [key: string]: (_list: FormattedAnime[]) => FormattedAnime[]
} = {
  sortByName: list => [...list].sort((a, b) => a.name.localeCompare(b.name)),
  sortByScore: list => [...list].sort((a, b) => b.score - a.score),
  sortByDuration: list =>
    [...list].sort((a, b) => a.episodes * a.duration - b.episodes * b.duration),
  sortByYear: list => [...list].sort((a, b) => b.year - a.year),
}

let toLocaleCase = (string: string): string =>
  string.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

let sortSelectOptions = Object.keys(sortFunc).map(sortFunctionName => ({
  label: t.value[toLocaleCase(sortFunctionName) as SortFunctionName],
  value: sortFunctionName,
}))

let totalTime = formattedAnimeList.reduce(
  (accumulator, { duration, episodes }) => accumulator + duration * episodes,
  0,
)

let animeList = computed(() => {
  let identity = <T extends unknown>(x: T): T => x
  let sort = selectedSorting.value ? sortFunc[selectedSorting.value] : identity
  return sort(formattedAnimeList).reduce<FormattedAnime[]>(
    (accumulator, currentAnime) => {
      if (
        Array.from(selectedGenres.value).every(genre =>
          currentAnime.genres.includes(genre),
        )
      ) {
        return [...accumulator, currentAnime]
      }
      return accumulator
    },
    [],
  )
})
</script>

<template>
  <Header />
  <Container size="l">
    <h1 :class="$style.title">Anime</h1>
    <div :class="$style.options">
      <Select
        v-model="selectedSorting"
        :options="sortSelectOptions"
        :empty-label="t.sort"
        icon-position="left"
        :icon="SortDownIcon"
      />
      <div :class="$style.genres">
        <Tag
          v-for="genre in animeGenres"
          :key="genre"
          :type="selectedGenres.includes(genre) ? 'active' : 'disabled'"
          :on-click="
            () => {
              if (selectedGenres.includes(genre)) {
                selectedGenres = selectedGenres.filter(
                  currentGenre => currentGenre !== genre,
                )
              } else {
                selectedGenres = [...selectedGenres, genre]
              }
            }
          "
        >
          {{ genre }}
        </Tag>
      </div>
    </div>
    <div :class="$style.list">
      <template v-if="animeList.length > 0">
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
          <picture>
            <source type="image/avif" :srcSet="image.avif" />
            <img
              :class="$style.image"
              :src="image.webp"
              :alt="name"
              width="460"
              height="630"
              draggable="false"
            />
          </picture>
          <div :class="$style.info">
            <div>
              <span :class="$style.name" v-text="name" />
              <span :class="$style['origin-name']" v-text="originName" />
              <span
                :class="$style.data"
                v-text="`Genres: ${genres.join(', ')}`"
              />
              <span :class="$style.data" v-text="`Duration: ${time}`" />
              <span :class="$style.data" v-text="`Year: ${year}`" />
            </div>
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
      </template>
      <p v-else>No anime found.</p>
    </div>
    <span :class="$style.total" v-text="`Total: ${timeConvert(totalTime)}`" />
  </Container>
  <Footer />
</template>

<style module>
.title {
  margin-block-start: 0;
}

.options {
  display: grid;
  grid-gap: var(--size-m);
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-xs) var(--size-xxs);
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--size-m);
  margin-top: var(--size-xxl);
}

.element {
  display: grid;
  grid-template-columns: clamp(7.25rem, 6.65rem + 2vw, 8.25rem) 1fr;
  gap: var(--size-m);
}

.image {
  height: auto;
  user-select: none;
  filter: sepia(0.6) saturate(2);
}

.info {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: minmax(0, 1fr);
}

.name {
  display: block;
  overflow: hidden;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-content-brand);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.origin-name {
  display: block;
  margin-bottom: var(--size-xs);
  font-size: var(--font-size-xxs);
  line-height: var(--line-height-xxs);
  color: var(--color-content-tertiary);
}

.data {
  display: block;
  margin-bottom: var(--size-xxs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
}

.stars {
  display: grid;
  grid-template-columns: repeat(10, var(--size-xs));
  grid-gap: var(--size-xxs);
  padding-bottom: var(--size-s);
}

.star {
  width: var(--size-xs);
  height: var(--size-xs);
}

.star-active {
  fill: var(--color-content-primary);
}

.total {
  display: block;
  margin-top: var(--size-xl);
}

@media (min-width: 360px) {
  .stars {
    display: grid;
    grid-template-columns: repeat(10, var(--size-s));
  }

  .star {
    width: var(--size-s);
    height: var(--size-s);
  }
}

@media (min-width: 960px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
