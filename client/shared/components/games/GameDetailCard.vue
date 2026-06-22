<template>
  <article class="card detail-card">

    <!-- Hero Image -->
    <div class="detail-card__image-wrap">
      <BaseImage
        :src="gameImage || ''"
        :alt="game.title"
        class="detail-card__image"
      />
      <div class="detail-card__image-fade" />
      <div v-if="game.averageRating != null" class="detail-card__rating-badge">
        <span class="detail-card__rating-star i-star">★</span>
        <span>{{ game.averageRating.toFixed(1) }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="detail-card__body">
      <h1 class="detail-card__title i-fg">{{ game.title }}</h1>

      <div class="detail-card__meta">
        <span v-if="game.release_date" class="i-accent">Released {{ formattedDate }}</span>

        <template v-if="game.averageRating != null">
          <span class="detail-card__dot i-muted">·</span>
          <span class="detail-card__count i-accent">
            {{ game.averageRating.toFixed(1) }} Rating ({{ game.totalReviews?.toLocaleString() }} reviews)
          </span>
        </template>

        <template v-if="game.developer?.name">
          <span class="detail-card__dot i-muted">·</span>
          <span class="detail-card__developer i-muted">
            Developer: <strong class="i-accent">{{ game.developer.name }}</strong>
          </span>
        </template>
      </div>

      <div v-if="game.genre" class="detail-card__tags">
        <Tag :tag="game.genre?.name || ''" />
      </div>

      <p v-if="game.description" class="detail-card__description i-fg">
        {{ game.description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import Tag from '~/shared/components/ui/Tag.vue';
import type { GameAttributes } from '~/shared/models/game.model';
import formatDate from '~/shared/utils/formatDate';
import BaseImage from '../ui/BaseImage.vue';

const props = defineProps<{
  game: GameAttributes;
}>();

useSeoMeta({
  title: `${props.game.title} — Game Detail`,
  description: props.game.description,
  ogTitle: props.game.title,
  ogDescription: props.game.description,
  ogImage: props.game.images?.[0]?.image_url ?? '',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: props.game.title,
  twitterDescription: props.game.description,
  twitterImage: props.game.images?.[0]?.image_url ?? '',
})

const gameImage = computed(() => {
  const imgs = props.game?.images ?? []
  const found = imgs.find((image: any) => image.image_type === 'Cover')
  return found?.image_url ?? ''
})

const formattedDate = computed(() => formatDate(props.game?.release_date))


</script>

<style scoped lang="scss">
.detail-card {
  overflow: hidden;
  margin-bottom: 2rem;

  &__image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 7;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__image-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.35));
    pointer-events: none;
  }

  &__rating-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #fff;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
  }

  &__rating-star { line-height: 1; }

  &__body {
    padding: 1.25rem 1.5rem 1.5rem;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    line-height: 1.2;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.875rem;
    font-size: 0.8125rem;
  }

  &__developer {
    margin-left: auto;
    strong { 
      font-weight: 500;
    }
  } 

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.875rem;
  }

  &__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 0;
  }
}
</style>
