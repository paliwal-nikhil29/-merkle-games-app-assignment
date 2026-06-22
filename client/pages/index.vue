<template>
    <section class="listing" aria-labelledby="images">
      <h1 id="images">Top 15 Games</h1>
      <p class="listing-description">Browse and discover the best rated games across all genres.</p>

      <div class="controls">
        <div class="controls__left">
          <div>
            <label for="search">Search</label>
            <input id="search" type="search" placeholder="Search games..." class="g-form-control" v-model="search"/>
          </div>
        </div>

        <div class="controls__right">
          <div class="control">
            <label for="sort-by">Sort by</label>
            <select id="sort-by" class="g-form-control" v-model="sort">
              <option v-for="option in SORT_OPTIONS" :value="option.value">{{option.label}}</option>
            </select>
          </div>

          <div class="control">
            <label for="sort-order">Sort order</label>
            <select id="sort-order" class="g-form-control" v-model="order">
                <option v-for="option in SORT_ORDER_OPTIONS" :value="option.value">{{option.label}}</option>
            </select>
          </div>
        </div>
      </div>

      <div aria-live="polite" :aria-busy="pending">
        <div v-if="pending" class="cards-grid" role="status" aria-label="Loading games">
          <AppShimmer v-for="n in PAGINATION.DEFAULT_PAGE_SIZE" :key="n" />
        </div>

        <AppError v-else-if="error" :error="error" @retry="refresh" />

        <p v-else-if="!sortedGames.length" class="i-muted" role="status">
          {{ UI_MESSAGES.NO_GAMES_FOUND }}
        </p>

        <ul v-else class="cards-grid">
          <li class="game-card" v-for="game in sortedGames" :key="game.id">
            <NuxtLink :to="`/games/${game.id}`" :aria-label="`View ${game.title}`">
              <GameCard :game="game" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
</template>

<script setup lang="ts">
import AppError from '~/shared/components/ui/AppError.vue';
import useDebounce from '~/shared/composables/useDebounce';
import { PAGINATION, SORT_OPTIONS, SORT_ORDER_OPTIONS, UI_MESSAGES } from '~/shared/constants/app.constants';
import AppShimmer from '~/shared/components/ui/AppShimmer.vue';
import useGames from '~/shared/composables/useGames';
import GameCard from '~/shared/components/games/GameCard.vue';

const search = ref('');
const sort = ref('rating');
const order = ref('desc');
const debouncedSearch = useDebounce(search, 300);

const { getAll } = useGames();
const { data: gamesData, pending, error, refresh } = await getAll({ search: debouncedSearch });

useSeoMeta({
  title: 'Game Library — Discover Top Rated Games',
  description: 'Browse and discover the best rated games across all genres.',
  ogTitle: 'Game Library',
  ogDescription: 'Browse and discover the best rated games across all genres.',
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Game Library',
  twitterDescription: 'Browse and discover the best rated games across all genres.',
  twitterImage: '/logo.png',
})

const sortedGames = computed(() => {
  const list = gamesData.value?.data || [];
  const arr = Array.isArray(list) ? [...list] : [];

  const key = sort.value;

  arr.sort((a: any, b: any) => {
    if (key === 'release_date') {
      const da = a.release_date ? new Date(a.release_date).getTime() : 0;
      const db = b.release_date ? new Date(b.release_date).getTime() : 0;
      return da - db;
    }
    const ra = a.averageRating ?? a.rating ?? 0;
    const rb = b.averageRating ?? b.rating ?? 0;
    return ra - rb;
  })

  if (order.value === 'desc') arr.reverse()
  return arr;
});

</script>

<style lang="scss">

.listing{
  &-description {
    font-size: 0.875rem;
    color: var(--i-muted);
    margin-bottom: 2.5rem;
  }
}

.cards-grid {
  display: grid;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  grid-template-columns: 1fr;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1680px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.game-card {
  min-width: 220px;
  width: 100%;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  label{
    display: block;
    font-size: 0.875rem;
    color: var(--i-muted);
    margin-bottom: 0.5rem;
  }
}
.controls__left {
  min-width: 320px;  
}
.controls__right {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 0 0 auto;
}

.controls__right .control {
  display: flex;
  flex-direction: column;
  min-width: 125px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls__right {
    width: 100%;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .controls__left {
    min-width: 100%;  
  }

  .controls__right .control {
    width: 100%;
    min-width: auto;
  }
}
</style>
