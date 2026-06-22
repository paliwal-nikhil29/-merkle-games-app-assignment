<template>
  <header class="app-header i-bg">
    <div class="container app-header__inner">
      <NuxtLink to="/" class="app-header__brand i-fg">
        <span class="app-header__name">Games App</span>
      </NuxtLink>

      <button
        class="app-header__theme"
        type="button"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :aria-pressed="isDark"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ isDark ? '☀️' : '🌙' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const isDark = ref(false);

const apply = (dark: boolean) => {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
};

const toggleTheme = () => {
  const next = !isDark.value;
  apply(next);
  localStorage.setItem('theme', next ? 'dark' : 'light');
};

// read persisted/system preference on client only (SSR-safe)
onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    apply(saved === 'dark');
  } else {
    apply(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
});
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 0.5px solid var(--i-muted);
  backdrop-filter: blur(6px);

  &__inner {
    margin: 0 auto;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.0625rem;
  }

  &__theme {
    background: none;
    border: 0.5px solid var(--i-muted);
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
