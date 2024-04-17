<template>
    
    <div class="title-container mt-10 md:my-10 lg:my-20 bg-primary w-max mx-auto py-2 px-8 md:py-4 md:px-8 lg:py-6 lg:px-12">
    <h1 class="text-center text-2xl md:text-4xl lg:text-6xl uppercase text-background">Volleyboll Turnering</h1>
    </div>

    <div class="bg-background input-container xl:w-1/4 px-3 pt-1 pb-5 mt-5 rounded-md w-fit mx-auto">
    <div class="mt-5 px-10 lg:py-6  mx-auto">
    <Input type="text"  v-model="tournamentName" placeholder="Turnamentnamn..." class="title-container text-1xl md:text-2xl lg:text-2xl h-full text-center border-foreground border-b-4 lg:p-4" />
    </div>

    <p class="pt-2 text-center text-sm md:text-md lg:text-lg">Skriv namnet på turnamentet ovan.</p>

    <div class="mt-4  lg:py-6 lg:px-12 lg:w-1/2 mx-auto flex justify-center">
        <Button :class="{'disabled-button': !isButtonActive}" class="title-container text-sm md:text-1xl lg:text-2xl m-1 lg:p-6">
            <template v-if="isButtonActive">
                <RouterLink to="/grupp">Gruppspel</RouterLink>
            </template>
            <span v-else class="text-gray-500 ">Gruppspel</span>
        </Button>
        <Button :class="{'disabled-button': !isButtonActive}" class="title-container text-sm md:text-1xl lg:text-2xl m-1 lg:p-6">
            <template v-if="isButtonActive">
                <RouterLink to="/slut">Slutspel</RouterLink>
            </template>
            <span v-else class="text-gray-500 ">Slutspel</span>
        </Button>
    </div>
</div>

<p>{{ store.tournaments }}</p>

</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

import { useTournamentStore } from '@/stores/tournament';


const store = useTournamentStore();
const tournamentName = ref(store.tournamentName);

onMounted(async () => {
    const response = await store.getTournaments();
    if (response == false) {
        store.tournaments = 'No tournaments';
    }
    
});

watch(tournamentName, (newName) => {
    store.topThree = null;
    store.setTournamentName(newName);
});

const isButtonActive = computed(() => tournamentName.value.trim().length > 0);


</script>

<style scoped>

.title-container {
    border-radius: 5rem;
}

.input-container {
}


.disabled-button {
    background-color: #ccc; /* Gray out the button */
    cursor: not-allowed;
    
}

</style>