<script setup lang="ts">
import { ref } from "vue";

const draggableElementRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const pointerX = ref(0);
const pointerY = ref(0);

function onDragStart(event: MouseEvent) {
  isDragging.value = true;
  pointerX.value = event.offsetX;
  pointerY.value = event.offsetY;

  document.addEventListener("pointermove", onDrag);
  document.addEventListener("pointerup", onDragEnd);
}

function onDrag(event: MouseEvent) {
  if (!isDragging.value) return;
  const sandboxElement = document.getElementById("sandbox");
  if (!sandboxElement || !draggableElementRef.value) return;
  const sandboxElementRect = sandboxElement.getBoundingClientRect();
  const draggableElementRect = draggableElementRef.value.getBoundingClientRect();

  const left = event.clientX - sandboxElementRect.left - pointerX.value;
  const top = event.clientY - sandboxElementRect.top - pointerY.value;

  if (left >= 0 && left <= sandboxElementRect.width - draggableElementRect.width) {
    draggableElementRef.value.style.left = left + "px";
  } else if (left < 0) {
    draggableElementRef.value.style.left = 0 + "px";
  } else if (left > sandboxElementRect.width - draggableElementRect.width) {
    draggableElementRef.value.style.left =
      sandboxElementRect.width - draggableElementRect.width + "px";
  }

  if (top >= 0 && top <= sandboxElementRect.height - draggableElementRect.height) {
    draggableElementRef.value.style.top = top + "px";
  } else if (top < 0) {
    draggableElementRef.value.style.top = 0 + "px";
  } else if (top > sandboxElementRect.height - draggableElementRect.height) {
    draggableElementRef.value.style.top =
      sandboxElementRect.height - draggableElementRect.height + "px";
  }
}

function onDragEnd(event: MouseEvent) {
  if (!isDragging.value) return;
  isDragging.value = false;
}
</script>

<template>
  <div ref="draggableElementRef" class="draggable" @pointerdown="onDragStart">
    <slot>Drag Me</slot>
  </div>
</template>

<style scoped>
.draggable {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: orangered;
  color: white;
  cursor: grab;
  display: inline;
  user-select: none;
  padding: 10px;
  border-radius: 4px;
}
.draggable:active {
  cursor: grabbing;
}
</style>
