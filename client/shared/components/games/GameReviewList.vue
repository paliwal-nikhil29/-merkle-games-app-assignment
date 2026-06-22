<template>
  <section class="reviews">
    <h2 class="reviews__title i-fg">Reviews ({{ reviews.length }})</h2>

    <p v-if="!reviews.length" class="reviews__empty i-muted">
      No reviews yet.
    </p>

    <ul v-else class="reviews__list">
      <li
        v-for="review in reviews"
        :key="review.id"
        class="card reviews__card"
      >
        <div class="reviews__header">
          <span class="reviews__avatar" aria-hidden="true">{{ initial(review.user?.username) }}</span>
          <span class="reviews__author i-fg">{{ review.user?.username }}</span>
          <span class="reviews__stars i-star">
            <span aria-hidden="true">{{ stars(review.rating) }}</span>
            <span class="sr-only">Rated {{ review.rating }} out of 5</span>
          </span>
        </div>
        <p class="reviews__body i-muted">{{ review.review_text }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Review } from '~/shared/models/game.model';

defineProps<{
  reviews: Review[];
}>();

const initial = (name?: string) => (name?.trim()?.charAt(0) || '?').toUpperCase();
const stars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));
</script>

<style scoped lang="scss">
.reviews {
  margin-top: 0.5rem;

  &__title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.875rem;
  }

  &__empty {
    font-size: 0.875rem;
    margin: 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__card {
    padding: 0.875rem 1rem;
    margin-bottom: 0.75rem;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    background: var(--i-accent);
  }

  &__author {
    font-size: 0.875rem;
    font-weight: 500;
  }

  &__stars {
    margin-left: auto;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }

  &__body {
    font-size: 0.8125rem;
    line-height: 1.5;
    margin: 0;
  }
}
</style>
