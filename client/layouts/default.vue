<script setup lang="ts">
import AppHeader from '~/shared/components/ui/AppHeader.vue';

</script>

<template>
  <div class="app-wrap">
    <AppHeader />
    <main id="main" class="container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-wrap {
  min-height: 100vh;
  background: var(--i-bg);
  color: var(--i-fg);
}

</style>
