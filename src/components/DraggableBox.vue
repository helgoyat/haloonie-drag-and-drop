<script setup lang="ts">
import { ref } from "vue";

const draggableBoxRef = ref<HTMLElement | null>(null);
// const isDragging = ref(false);
const boxPointerX = ref(0);
const boxPointerY = ref(0);

function onDragStart(event: MouseEvent) {
  boxPointerX.value = event.offsetX;
  boxPointerY.value = event.offsetY;
  // isDragging.value = true;
  document.addEventListener("pointermove", onDrag);
  document.addEventListener("pointerup", onDragEnd);
}

function onDrag(event: MouseEvent) {
  if (!draggableBoxRef.value) return;
  const parentCanva = draggableBoxRef.value.parentElement;
  if (!parentCanva || !parentCanva.classList.contains("canva")) return;

  const canvaRect = parentCanva.getBoundingClientRect();
  const boxRect = draggableBoxRef.value.getBoundingClientRect();

  const boxRelativeLeft = event.clientX - canvaRect.left - boxPointerX.value;
  const boxRelativeTop = event.clientY - canvaRect.top - boxPointerY.value;

  const maximumLeft = canvaRect.width - boxRect.width;
  const maximumTop = canvaRect.height - boxRect.height;

  if (boxRelativeLeft >= 0 && boxRelativeLeft <= maximumLeft) {
    draggableBoxRef.value.style.left = boxRelativeLeft + "px";
  } else if (boxRelativeLeft < 0) {
    draggableBoxRef.value.style.left = 0 + "px";
  } else if (boxRelativeLeft > maximumLeft) {
    draggableBoxRef.value.style.left = maximumLeft + "px";
  }

  if (boxRelativeTop >= 0 && boxRelativeTop <= maximumTop) {
    draggableBoxRef.value.style.top = boxRelativeTop + "px";
  } else if (boxRelativeTop < 0) {
    draggableBoxRef.value.style.top = 0 + "px";
  } else if (boxRelativeTop > maximumTop) {
    draggableBoxRef.value.style.top = maximumTop + "px";
  }
}

function onDragEnd(event: MouseEvent) {
  // isDragging.value = false;
  document.removeEventListener("pointermove", onDrag);
  document.removeEventListener("pointerup", onDragEnd);
  boxPointerX.value = 0;
  boxPointerY.value = 0;
}
</script>

<template>
  <div
    ref="draggableBoxRef"
    class="absolute top-0 left-0 shadow-xs bg-pink-500 text-white cursor-grab inline select-none py-3 px-4 rounded active:cursor-grabbing"
    @pointerdown="onDragStart"
  >
    <slot>Drag Me</slot>
  </div>
</template>
