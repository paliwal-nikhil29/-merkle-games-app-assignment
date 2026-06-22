<template>
  <div class="app-error i-bg i-border" role="alert">
    <span class="app-error__code i-danger">{{ code }}</span>
    <p class="app-error__message i-fg">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { API_ERRORS } from '~/shared/constants/app.constants';

const props = defineProps<{
  error?: any;
  message?: string;
}>();


const code = computed(
  () => props.error?.statusCode ?? props.error?.status ?? 500,
);

const message = computed(() => {
  if (props.message) return props.message;
  switch (code.value) {
    case 401:
    case 403:
      return API_ERRORS.UNAUTHORIZED;
    case 404:
      return API_ERRORS.NOT_FOUND;
    case 408:
      return API_ERRORS.TIMEOUT;
    case 500:
    case 502:
    case 503:
      return API_ERRORS.SERVER_ERROR;
    default:
      return API_ERRORS.UNKNOWN;
  }
});
</script>

<style scoped lang="scss">
.app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  border: 0.5px solid;
  border-radius: 0.75rem;
  padding: 2.5rem 1.5rem;
  margin: 1rem 0;

  &__code {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }

  &__message {
    font-size: 0.9375rem;
    margin: 0;
  }

  &__retry {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--i-accent);
    background: none;
    border: 0.5px solid var(--i-accent);
    border-radius: 0.5rem;
    padding: 0.375rem 0.875rem;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover { background: rgba(99, 102, 241, 0.08); }
  }
}
</style>
