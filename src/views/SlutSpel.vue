<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="errorMessage">{{ errorMessage }}</div>
  <div v-if="store.slutData && !isLoading">
    <div
      id="bracket"
      class="relative flex flex-col items-center text-xs lg:text-lg mt-5 mx-auto"
    >
      <div
        v-for="(stage, index) in formattedStages"
        :key="index"
        class="flex flex-col items-center mb-10"
      >
        <div class="" v-if="stage.games.length">
          <h2 class="text-2xl lg:text-4xl font-bold mb-10 mx-2 text-center">{{ stage.stage }}</h2>
          <!-- <img v-if="stage.stage === 'Final'" :src="finalLine" class="final-line"/>
          <img v-if="stage.stage === 'Semifinal'" :src="semiLine" class="semi-line"/> -->
          <div class="flex flex-row">
            <div
              :id="`stage-${index}`"
              v-for="(game, gameIndex) in stage.games"
              :key="gameIndex"
              class="bg-white p-2 rounded-sm shadow-lg m-1 relative game-box"
            >
              <p>{{ game.player1.name || "TBD" }} vs {{ game.player2.name || "TBD" }}</p>
              <p class="text-center" v-if="game.winner">V: {{ game.winner }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <p>{{ store.slutData }}</p> -->
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick, watchEffect } from "vue";
import { useTournamentStore } from "@/stores/tournament";
import { useRouter } from "vue-router";

import finalLine from "@/assets/final_lines.svg";
import semiLine from "@/assets/semi_lines.svg";
import lines from "@/assets/lines.svg";

const store = useTournamentStore();
const router = useRouter();
const isLoading = ref(true);
const errorMessage = ref("");
const start = ref(null);
const end = ref(null);

onMounted(async () => {
  const response = await store.getSlut();
  isLoading.value = false;
  if (response == false) {
    errorMessage.value = "Invalid tournament name. Redirecting...";
    setTimeout(() => router.push("/"), 100); // Redirect after 3 seconds
  } else {
    console.log(store.slutData);
  }
});

// Computed property to safely format rounds for the Bracket component
const formattedStages = computed(() => {
  return store.slutData.map((stage) => ({
    stage: stage.stage,
    games: stage.games.map((game) => ({
      player1: { ...game.player1, name: game.player1.name || "TBD" },
      player2: { ...game.player2, name: game.player2.name || "TBD" },
      winner: game.player1.winner
        ? game.player1.name
        : game.player2.winner
        ? game.player2.name
        : "",
    })),
  }));
});
</script>

<style scoped>

.final-line {
   margin-top: -100px;
   margin-bottom: 10px
}

.semi-line {
   margin-top: -110px;
}

.lines {
    position: absolute;
    margin-top: 160px;
    width: 70%;
}
</style>
