<script setup></script>

<template>
  <div class="stretch-container">
    <slot />
  </div>
</template>

<style scoped>
.stretch-container > * {
  width: 100%;
  height: 100%;
}
/* или */
.stretch-container > :slotted(img),
/* или */
.stretch-container > :deep(video),
.stretch-container > :deep(picture) {
  object-fit: scale-down;
}
</style>
