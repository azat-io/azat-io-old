<template>
  <main :class="$style.main">
    <div>
      <h1>404</h1>
      <p>Page not found. Back to <a href="/">home</a>.</p>
    </div>
  </main>
</template>

<style module>
.main {
  display: grid;
  place-items: center;
  height: 100vh;
  text-align: center;
}
</style>
