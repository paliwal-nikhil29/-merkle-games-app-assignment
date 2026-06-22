<template>
  <span class="g-tag i-muted" >{{ tag }}</span>
</template>

<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>