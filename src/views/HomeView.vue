<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center gap-8">
    <h1 class="text-3xl font-bold text-white">Haloonie - Drag and Drop</h1>
    <div
      id="sandbox"
      class="relative bg-orange-500 w-[400px] aspect-square rounded"
    >
      <draggable-box></draggable-box>
    </div>
  </div>
</template>

<style scoped></style>
