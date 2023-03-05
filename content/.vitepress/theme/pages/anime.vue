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
  label: sortFunctionName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, string => string.toUpperCase()),
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
:root {
  --origin-image-width: 460px;
  --origin-image-height: 630px;
  --origin-image-coefficient: clamp(0.3, 0.15 + 0.1875, 0.375);
  --block-width: calc(
    var(--origin-image-width) * var(--origin-image-coefficient)
  );
  --block-height: calc(
    var(--origin-image-height) * var(--origin-image-coefficient)
  );
  --star-size: clamp(1rem, 0.825rem + 0.25vw, 1.125rem);
}

.title {
  margin-block-start: 0;
}

.options {
  display: grid;
  gap: var(--space-l);
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-2xs);
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-m);
  margin-top: var(--space-xl);
}

.element {
  display: grid;
  grid-template-columns:
    var(--block-width)
    1fr;
  gap: var(--space-m);
}

.image {
  width: var(--block-width);
  height: var(--block-height);
  user-select: none;
  filter: sepia(0.6) saturate(2);
}

.info {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: minmax(0, 1fr);
  height: var(--block-height);
}

.name {
  display: block;
  overflow: hidden;
  font: var(--font-s);
  color: var(--color-content-brand);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.origin-name {
  display: block;
  margin-bottom: var(--space-2xs);
  font: var(--font-xs);
  color: var(--color-content-tertiary);
}

.data {
  display: block;
  margin-bottom: var(--space-2xs);
  font: var(--font-xs);
}

.stars {
  display: grid;
  grid-template-columns: repeat(10, var(--star-size));
  gap: 4px;
}

.star {
  width: var(--star-size);
  height: var(--star-size);
}

.star-active {
  fill: var(--color-content-primary);
}

.total {
  display: block;
  margin-top: var(--space-xl);
}

@media (width >= 960px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
