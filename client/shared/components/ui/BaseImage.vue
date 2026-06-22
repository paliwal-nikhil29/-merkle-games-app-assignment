<template>
  <img
    :src="currentSrc"
    :alt="alt"
    @error="handleError"
    loading="lazy"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRuntimeConfig } from '#app'

const props =  defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
  },
  fallback: {
    type: String,
    default: '/fallback.svg'
  },
  width: {
    type: [Number, String],
    default: undefined
  },
  height: {
    type: [Number, String],
    default: undefined
  }
})
const { src, fallback = '/fallback.svg' } = props

const config = useRuntimeConfig()
const baseUrl = config.public?.basePath ?? process.env.NUXT_PUBLIC_BASE_PATH ?? 'http://localhost:8000'

function resolveSrc(v: string | undefined) {
  if (!v) return fallback
  if (v.startsWith('http://') || v.startsWith('https://')) return v
  if (v.startsWith('/')) return `${baseUrl}${v}`
  return `${baseUrl}/${v}`
}

const currentSrc = ref(resolveSrc(src))

watch(() => props.src, (v) => {
  const resolved = resolveSrc(v as string | undefined)
  console.log('src changed:', resolved)
  currentSrc.value = resolved
})

// const imagePath = computed(() => {
//   return 'http://localhost:8000/'+props.src || fallback
// });

function handleError() {
  if (currentSrc.value !== fallback) currentSrc.value = fallback
}
</script>

<style scoped lang="scss">
img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
