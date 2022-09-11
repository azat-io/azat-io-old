<script lang="ts" setup>
import Container from '~/components/container.vue'
import WorldMap from '~/components/world-map.vue'
import Country from '~/components/country.vue'
import countries from '~/data/countries.json'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
</script>

<template>
  <Header />
  <Container>
    <h1 :class="$style.title">Travel map</h1>
    <Suspense>
      <WorldMap :countries="countries.map(({ code }) => code.toUpperCase())" />
    </Suspense>
    <div :class="$style.list">
      <Suspense v-for="(country, index) in countries" :key="index">
        <Country v-bind="country" />
      </Suspense>
    </div>
  </Container>
  <Footer />
</template>

<style module>
.title {
  margin-top: 0;
}

.list {
  display: grid;
  grid-gap: var(--size-s);
  margin-top: var(--size-xxl);
}

@media (min-width: 540px) {
  .list {
    grid-template-rows: repeat(7, 1fr);
    grid-auto-flow: column;
  }
}

@media (min-width: 960px) {
  .list {
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
  }
}
</style>
