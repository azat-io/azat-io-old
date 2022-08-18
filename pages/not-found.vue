<template>
  <main :class="$style.main">
    <h1>404</h1>
    <p>Page not found. Back to <RouterLink to="/">home</RouterLink>.</p>
  </main>
</template>

<style module>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
