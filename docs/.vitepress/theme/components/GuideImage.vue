<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  src: string
  alt: string
  caption?: string
}>()
</script>

<template>
  <figure class="guide-image">
    <img
      :src="withBase(src)"
      :alt="alt"
      width="1164"
      height="721"
      loading="lazy"
      decoding="async"
    />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
