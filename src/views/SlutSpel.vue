<template>
    <div>
        <h1>Slutspel</h1>
        <p v-if="isLoading">Loading...</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <div v-if="store.slutData && !isLoading">
            <p>{{ store.slutData }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTournamentStore } from '@/stores/tournament';
import { useRouter } from 'vue-router';

const store = useTournamentStore();
const router = useRouter();
const isLoading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
    const response = await store.getSlut();
    isLoading.value = false;
    if (response == false) {
        errorMessage.value = 'Invalid tournament name. Redirecting...';
        setTimeout(() => router.push('/'), 100); // Redirect after 3 seconds
    } else {
        console.log(store.slutData);
        // await store.topThree();
    }
});
</script>
