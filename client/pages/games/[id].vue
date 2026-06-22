<template>
  <section class="detail-page">
    <NuxtLink to="/" class="back-link i-accent">{{ UI_MESSAGES.BACK_BUTTON }}</NuxtLink>

    <div v-if="pending" class="detail-shimmer" role="status" aria-label="Loading game details">
      <AppShimmer height="auto" radius="0.75rem" class="detail-shimmer__hero" />
      <AppShimmer height="1.5rem" width="50%" />

      <AppShimmer
        v-for="n in 3"
        :key="n"
        height="3.5rem"
        radius="0.625rem"
        class="detail-shimmer__review"
      />
    </div>

    <AppError v-else-if="error" :error="error" @retry="refresh" />

    <template v-else-if="game?.data">
      <GameDetailCard :game="game.data" />
      <GameReviewList :reviews="game.data.reviews ?? []" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import GameDetailCard from '~/shared/components/games/GameDetailCard.vue'
import GameReviewList from '~/shared/components/games/GameReviewList.vue'
import AppError from '~/shared/components/ui/AppError.vue'
import AppShimmer from '~/shared/components/ui/AppShimmer.vue'
import useGames from '~/shared/composables/useGames'
import { UI_MESSAGES } from '~/shared/constants/app.constants'

const route = useRoute()
const id = String(route.params.id || '')

const { getById } = useGames()
const { data: game, pending, error, refresh } = await getById(id)
</script>

<style scoped lang="scss">
.detail-page {
  margin: 0 auto;
  padding: 1.5rem 1rem 4rem;
}

.back-link {
  display: inline-block;
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 1.25rem;

  &:hover { text-decoration: underline; }
}

.detail-shimmer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__hero {
    aspect-ratio: 16 / 7;
    margin-bottom: 0.25rem;
  }

  &__review:first-of-type {
    margin-top: 1rem;
  }
}
</style>
