<template>
  <div class="shimmer" :style="style" aria-hidden="true" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** block height — number (px) or any CSS length */
    height?: string | number;
    /** block width — defaults to full width */
    width?: string | number;
    /** corner radius */
    radius?: string;
  }>(),
  { height: '1rem', width: '100%', radius: '0.5rem' },
);

const toLen = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);

const style = computed(() => ({
  height: toLen(props.height),
  width: toLen(props.width),
  borderRadius: props.radius,
}));
</script>

<style scoped lang="scss">
.shimmer {
  position: relative;
  overflow: hidden;
  background: var(--i-tag-bg, rgba(128, 128, 128, 0.15));

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18),
      transparent
    );
    animation: shimmer 1.3s infinite;
  }
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>
