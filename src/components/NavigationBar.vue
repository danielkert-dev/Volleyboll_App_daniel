<script setup lang="ts">
import goldImage from '@/assets/img/gold.png';  // Using ES module imports
import silverImage from '@/assets/img/silver.png';
import bronzeImage from '@/assets/img/bronze.png';
import { ref, watch, computed } from 'vue';
import { useTournamentStore } from '@/stores/tournament';  // Import the store
import { useMediaQuery } from '@vueuse/core';
import {
Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter
} from '@/components/ui/drawer';
import {
Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';

const isOpen = ref(false);
const isDesktop = useMediaQuery('(min-width: 768px)');
const store = useTournamentStore();  // Use the store



watch(isDesktop, () => {
isOpen.value = false; // Close the menu when device type changes
});

const images = [goldImage, silverImage, bronzeImage];

// Computed property to format topThree
const formattedTopThree = computed(() => {
  if (typeof store.topThree !== 'string' || !store.topThree) return '';
  const parts = store.topThree.split(',').map((part, index) => {
    const [position, teamName] = part.trim().split(':');
    const imageTag = `<img src="${images[index]}" alt="Position ${index + 1}" style="width: 20px; height: 20px; margin-right: 5px; margin-left: 5px;">`;
    return `${imageTag} ${teamName.trim()}`;
  });
  return parts.join(' ');
});

watch(store.topThree, (newValue) => {
  console.log('New topThree value:', newValue);
  console.log('Type of topThree:', typeof newValue);
}, { immediate: true });


</script>
  

<template>
    <nav class="h-10 fixed top-0 left-0 right-0 z-50 bg-primary flex justify-between items-center overflow-hidden">
      
      <RouterLink to="/" class="w-full flex justify-start overflow-hidden" @click="isOpen = false">
        <img class="h-6 m-2" src="@/assets/img/logo.png"/>
        <span class="text-white text-md my-auto capitalize poppins-regular">{{ store.tournamentName }}</span>
        <span v-if="store.gruppData && formattedTopThree" class="text-white text-xs my-auto ml-2 mt-3 flex poppins-regular" v-html="formattedTopThree"></span>
      </RouterLink>



      <Button @click="isOpen = !isOpen" class="hamburger m-2 absolute right-0 top-1/4 transform -translate-y-1/2 mr-2">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </Button>
     <!-- Dialog for Desktop Screens -->
     <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="text-center">Menu</DialogTitle>
        </DialogHeader>
        <div class="grid gap-3 p-4">
        <Button  >
          <RouterLink to="/" class="w-full" @click="isOpen = false">Start sida</RouterLink>
        </Button>
        <Button  >
          <RouterLink to="/grupp" class="w-full" @click="isOpen = false">Gruppspel</RouterLink>
        </Button>
        <Button  >
          <RouterLink to="/slut" class="w-full" @click="isOpen = false">Slutspel</RouterLink>
        </Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Drawer for Mobile Screens -->
    <Drawer v-else v-model:open="isOpen">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div class="grid gap-3 p-4">
        <Button  >
          <RouterLink to="/" class="w-full" @click="isOpen = false">Start sida</RouterLink>
        </Button>
        <Button >
          <RouterLink to="/grupp" class="w-full" @click="isOpen = false">Gruppspel</RouterLink>
        </Button>
        <Button >
          <RouterLink to="/slut" class="w-full" @click="isOpen = false">Slutspel</RouterLink>
        </Button>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="secondary" @click="isOpen = false">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </nav>
</template>
  
<style scoped>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px; /* Width of the hamburger */
  height: 24px; /* Total height of the hamburger */
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
}

.hamburger:focus {
  outline: none;
}

.hamburger-line {
  width: 80%; /* Full width of the hamburger */
  height: 3px; /* Line thickness */
  background-color: #fff; /* Color of the hamburger lines */
  transition: all 0.3s linear;
  border-radius: .2rem;
}

</style>