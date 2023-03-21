<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

import { timeConvert } from '~/lib/time-convert'
import IconSortDown from '~/icons/sort-down.vue'
import UiTypography from '~/ui/typography.vue'
import UiContainer from '~/ui/container.vue'
import IconStar from '~/icons/star.vue'
import UiSelect from '~/ui/select.vue'
import UiTag from '~/ui/tag.vue'

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

<script lang="ts">
export default {
  name: 'PageAnime',
}
</script>

<template>
  <ui-container size="l">
    <ui-typography color="brand" size="2xl" as="h1" bold>Anime</ui-typography>
    <div class="options">
      <ui-select
        v-model="selectedSorting"
        :options="sortSelectOptions"
        empty-label="Sort"
        icon-position="start"
        :icon="IconSortDown"
      />
      <div class="genres">
        <ui-tag
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
        </ui-tag>
      </div>
    </div>
    <ul v-if="animeList.length > 0" class="list">
      <li
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
        class="element"
      >
        <picture>
          <source type="image/avif" :srcSet="image.avif" />
          <img
            class="image"
            :src="image.webp"
            :alt="name"
            width="460"
            height="630"
            draggable="false"
          />
        </picture>
        <div class="info">
          <div class="data">
            <div>
              <ui-typography color="brand" size="s" no-wrap>
                {{ name }}
              </ui-typography>
              <ui-typography color="tertiary" size="xs">
                {{ originName }}
              </ui-typography>
            </div>
            <ui-typography color="primary" size="xs">
              {{ `Genres: ${genres.join(', ')}` }}
            </ui-typography>
            <ui-typography color="primary" size="xs">
              {{ `Duration: ${time}` }}
            </ui-typography>
            <ui-typography color="primary" size="xs">
              {{ `Year: ${year}` }}
            </ui-typography>
          </div>
          <div class="stars">
            <icon-star
              v-for="star in 10"
              :key="star"
              :class="[
                'star',
                {
                  ['star-active']: star <= score,
                },
              ]"
            />
          </div>
        </div>
      </li>
    </ul>
    <ui-typography v-else class="additional-data" color="primary" size="m">
      No anime found.
    </ui-typography>
    <ui-typography class="additional-data" color="primary" size="m">
      {{ `Total: ${timeConvert(totalTime)}` }}
    </ui-typography>
  </ui-container>
</template>

<style>
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
  --star-size: clamp(1rem, 0.825rem + 0.25vi, 1.125rem);
}
</style>

<style scoped>
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
  padding-inline-start: 0;
  margin-block-start: var(--space-xl);
}

.element {
  display: grid;
  grid-template-columns:
    var(--block-width)
    1fr;
  gap: var(--space-m);
  margin-block: 0;
}

.image {
  inline-size: var(--block-width);
  block-size: var(--block-height);
  user-select: none;
  filter: sepia(0.6) saturate(2);
}

.info {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: minmax(0, 1fr);
  block-size: var(--block-height);
}

.data {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.stars {
  display: grid;
  grid-template-columns: repeat(10, var(--star-size));
  gap: 4px;
}

.star {
  inline-size: var(--star-size);
  block-size: var(--star-size);
}

.star-active {
  fill: var(--color-content-primary);
}

.additional-data {
  margin-block-start: var(--space-l);
}

@media (width >= 960px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
