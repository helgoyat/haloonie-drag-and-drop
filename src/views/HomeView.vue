<script setup lang="ts"></script>

<template>
  <div>
    <h1>Drag and Drop</h1>
    <div id="sandbox">
      <draggable-box></draggable-box>
      <draggable-box></draggable-box>
    </div>
  </div>
</template>

<style scoped>
#sandbox {
  position: relative;
  background-color: darkslateblue;
  height: 300px;
  border-radius: 4px;
}
</style>
