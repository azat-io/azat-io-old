<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

import Container from '~/components/container.vue'
import SortDownIcon from '~/icons/sort-down.svg'
import Select from '~/components/select.vue'
import StarIcon from '~/icons/star.svg'
import Tag from '~/components/tag.vue'

export type Genre =
  | 'action'
  | 'adventure'
  | 'comedy'
  | 'drama'
  | 'ecchi'
  | 'fantasy'
  | 'horror'
  | 'mecha'
  | 'mystery'
  | 'psychological'
  | 'romance'
  | 'sci-fi'
  | 'slice-of-life'
  | 'supernatural'
  | 'thriller'

export interface Anime {
  name: string
  originName: string
  image: {
    avif: string
    webp: string
  }
  genres: Genre[]
  year: number
  duration: number
  episodes: number
  score: number
}

let { frontmatter } = useData()

let anime: Anime[] = frontmatter.value.data

type FormattedAnime = Anime & {
  time: string
}

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

let formattedAnimeList: FormattedAnime[] = anime.map(
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

let sortSelectOptions = Object.keys(sortFunc).map(sortFunctionName => ({
  label: sortFunctionName,
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
  <Container size="l">
    <h1 :class="$style.title">Anime</h1>
    <div :class="$style.options">
      <Select
        v-model="selectedSorting"
        :options="sortSelectOptions"
        empty-label="Sort"
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

@media (width >= 360px) {
  .stars {
    display: grid;
    grid-template-columns: repeat(10, var(--size-s));
  }

  .star {
    width: var(--size-s);
    height: var(--size-s);
  }
}

@media (width >= 960px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
