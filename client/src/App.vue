<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import EventModal from './components/EventModal.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="bg-page">
      <router-view />
    </div>
  </main>
  <footer>
  </footer>

  <EventModal />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
