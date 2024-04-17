<script setup lang="ts">
import { Button } from '@/components/ui/button';
import NavigationBar from '@/components/NavigationBar.vue';
import { Badge } from '@/components/ui/badge'


import { ref, onMounted, onUnmounted, computed } from 'vue';

const windowWidth = ref(window.innerWidth);  // Reactive reference for window width

// Update the windowWidth on window resize
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const bgClass = computed(() => {
  return windowWidth.value < 768 ? 'bg-volley-mobile' : 'bg-volley-desktop';
});

</script>

<template>
  <NavigationBar />

  <main class="pt-10 poppins-medium overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-fixed" :class="bgClass"></div>
    <RouterView />
  </main>

  <p class="copyright text-xs uppercase text-center mt-2 text-zinc-600 poppins-light">Gjort av IT21</p>
</template>

<style scoped>
nav a, .button.full {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  width: 100%; /* full width for links in drawer */
}

main {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

main::before {
  content: '';
  position: fixed;
  top: 0; /* slightly larger than the viewport */
  left: 0;
  width: 100vw; /* expand width to compensate for blur */
  height: 100vh; /* expand height to compensate for blur */
  background-image: url('@/assets/img/volley-mobile.png');
  background-size: cover; /* cover the entire area of the pseudo-element */
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -2; /* place it behind the content */
}

.bg-volley-mobile {
  content: '';
  position: fixed;
  top: 0; /* slightly larger than the viewport */
  left: 0;
  width: 100vw; /* expand width to compensate for blur */
  height: 100vh; /* expand height to compensate for blur */
  background-image: url('@/assets/img/volley-mobile.png');
  background-size: cover; /* cover the entire area of the pseudo-element */
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1; /* place it behind the content */
}

.bg-volley-desktop {
  content: '';
  position: fixed;
  top: 0; /* slightly larger than the viewport */
  left: 0;
  width: 100vw; /* expand width to compensate for blur */
  height: 100vh; /* expand height to compensate for blur */
  background-image: url('@/assets/img/volley-desktop.png');
  background-size: cover; /* cover the entire area of the pseudo-element */
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1; /* place it behind the content */
}

.copyright {
  position: fixed;
  bottom: 1%;
  left: 50%;
  translate: -50%;


}


</style>
