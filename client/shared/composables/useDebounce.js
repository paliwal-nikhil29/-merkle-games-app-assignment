import { ref, watch } from 'vue'

export default function useDebounce(source, ms = 300) {
  const debounced = ref(source?.value ?? source ?? '')
  let timer = null

  watch(
    source,
    (v) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        debounced.value = v
        timer = null
      }, ms)
    },
    { immediate: true }
  )

  return debounced
}