<template>
  <!-- GameCard -->
   <div class="game-card i-bg i-border">
    <div class="game-card__image-wrap">
      <BaseImage :src="gameImage" :alt="game.title" width="100%" />
    </div>
    <div class="game-card__body">
      <h2 class="game-card__title i-fg">{{game.title}}</h2>
      <p class="game-card__date i-accent">{{ formattedDate }}</p>

      <div v-if="game.averageRating != null" class="game-card__rating">
        <span class="game-card__star i-star">★</span>
        <span class="game-card__score i-fg">{{ game.averageRating.toFixed(1) }}</span>
        <span class="game-card__count i-muted">({{ game.totalReviews }} reviews)</span>
      </div>

      <div class="game-card__tags">
        <Tag :tag="game.genre?.name || ''" />
      </div>
    </div>
  </div>
   
</template>

<script setup lang="ts">
import type { GameAttributes } from '~/shared/models/game.model';
import Tag from '~/shared/components/ui/Tag.vue';
import { formatDate } from '~/shared/utils/formatDate'
import BaseImage from '../ui/BaseImage.vue';

const props = defineProps<{
  game: GameAttributes;
}>();

const gameImage = computed(() => {
  const imgs = props.game?.images ?? []
  const found = imgs.find((image: any) => image.image_type === 'Artwork')
  return found?.image_url ?? ''
})

const formattedDate = computed(() => formatDate(props.game?.release_date))

</script>

<style scoped lang="scss">
.game-card {
  border: 0.5px solid var(--i-fg-two);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: var(--box-shadow);

  &:hover {
    transform: translateY(-2px);
  }

  &__image-wrap {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  &__body {
    padding: 0.875rem 1rem 1rem;
  }

  &__title {
    font-size: 1.0625rem;
    font-weight: 500;
    margin: 0 0 0.25rem;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    font-size: 0.8125rem;
    margin: 0 0 0.5rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
    margin-bottom: 0.75rem;
  }

  &__star {
    font-size: 1rem;
    line-height: 1;
  }

  &__score {
    font-size: 0.875rem;
    font-weight: 500;
  }

  &__count {
    font-size: 0.8125rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }
}
</style>
