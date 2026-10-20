<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createSakuraScene } from '../sakura/scene'

const canvas = ref(null)
let scene

onMounted(() => {
  scene = createSakuraScene(canvas.value)
})
onBeforeUnmount(() => scene?.destroy())
</script>

<template>
  <canvas ref="canvas" class="sakura" aria-hidden="true" />
</template>

<style scoped>
.sakura {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
