<script lang="ts" setup>
import Container from '~/components/container.vue'
import { usePosts } from '~/plugins/posts/client'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Hero from '~/components/hero.vue'

let posts = usePosts()
</script>

<template>
  <main :class="$style.main">
    <Header transparent />
    <Hero />
    <Container>
      <div :class="$style.posts">
        <div v-for="{ title, path, formattedDate } in posts" :key="title">
          <RouterLink :to="path" :class="$style.link">
            <h3 :class="$style.title" v-text="title" />
          </RouterLink>
          <span :class="$style.date" v-text="formattedDate" />
        </div>
      </div>
    </Container>
    <Footer />
  </main>
</template>

<style module>
.main {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.link {
  display: inline-block;
  padding: 0;
  margin-bottom: var(--size-xxs);
  background: none;
}

.link:hover:not(.link:focus-visible) {
  background: inherit;
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-l);
}

.title {
  margin: 0;
  font-size: var(--font-size-m);
  font-weight: normal;
  line-height: var(--line-height-m);
}

.date {
  display: block;
  font-size: var(--font-size-xxs);
  line-height: var(--line-height-xxs);
  color: var(--color-text);
}
</style>
