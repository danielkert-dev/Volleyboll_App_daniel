<template>
    <div class="p-1 md:w-1/2 lg:w-1/2 mx-auto ">
        <p v-if="isLoading">Loading...</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <div v-if="store.gruppData && !isLoading" class="lg:mt-20">
            <!-- Search Input -->
            <Input v-model="searchTerm" placeholder="Leta för lag..." class="mt-2"/>

            <!-- Search Results -->
            <div v-if="searchTerm && filteredTeams.length" class="mt-2 bg-background rounded-sm">
                <Table>
                    <TableCaption class="mb-2">Letat lag</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lag</TableHead>
                            <TableHead>Spel</TableHead>
                            <TableHead>V/F</TableHead>
                            <TableHead>Poäng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="team in filteredTeams" :key="team.id">
                            <TableCell>{{ team.name }}</TableCell>
                            <TableCell>{{ team.games }}</TableCell>
                            <TableCell>{{ team.wins }} / {{ team.losses }}</TableCell>
                            <TableCell>+{{ team.points }}/-{{ team.lost_points }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div v-else>
                <p class="text-center my-2">Inget lag letat / hittat</p>
            </div>

            
            <!-- All groups data -->

            <Accordion type="single" collapsible>
                <AccordionItem v-for="(group, index) in store.gruppData.tournament[0].groups" :key="group.name" :value="`item-${index}`" class="mt-2 bg-background rounded-sm">
                    <AccordionTrigger class="mx-5">{{ formatGroupName(group.name) }}</AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableCaption class="mb-2">{{ group.name }}</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead class="w-[30px]">#</TableHead>
                                    <TableHead class="w-[100px]">Lag</TableHead>
                                    <TableHead>Spel</TableHead>
                                    <TableHead>V/F</TableHead>
                                    <TableHead class="text-right">Poäng</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="(team, position) in sortTeamsByPoints(group.teams)" :key="team.id">
                                    <TableCell>{{ position + 1 }}</TableCell>
                                    <TableCell class="font-medium">{{ team.name }}</TableCell>
                                    <TableCell>{{ team.games }}</TableCell>
                                    <TableCell>{{ team.wins }} / {{ team.losses }}</TableCell>
                                    <TableCell class="text-right">+{{ team.points }}/-{{ team.lost_points }}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <p class="text-center text-md mt-5"> Grupp Matcher</p>
            <p class="text-center text-xm my-4">{{ store.gruppMatches.match_count }} Spel totalt</p>

<!-- Matches Data Display -->
<div v-if="sortedMatches && sortedMatches.length" class="mt-4 mb-8 bg-background rounded-sm">
    <Table>
        <TableCaption class="mb-4">Grupp Matcher</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Match</TableHead>
                <TableHead>Poäng</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="match in sortedMatches" :key="match.id" :class="{ 'done': match.is_completed, 'active': match.active }">
                <TableCell class="text-xs">{{ match.team1_name }} vs {{ match.team2_name }}</TableCell>
                <TableCell class="text-xs">{{ match.team1_points || '0' }}/{{ match.team2_points || '0' }}</TableCell>
                <TableCell class="text-xs">
                    {{ match.is_completed ? 'Completed' : match.active ? 'Active' : 'Ongoing' }}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</div>


            <!-- <p>{{ store.gruppMatches }}</p> -->

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useTournamentStore } from '@/stores/tournament';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card,CardContent, CardDescription,CardFooter,CardHeader,CardTitle,} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'vue-router';

const store = useTournamentStore();
const router = useRouter();
const isLoading = ref(true);
const errorMessage = ref('');
const searchTerm = ref('');

const filteredTeams = computed(() => {
    if (!searchTerm.value) return [];
    return store.gruppData.tournament[0].groups.flatMap(group => group.teams)
        .filter(team => team.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const sortedMatches = computed(() => {
    console.log('store.gruppMatches.groups_matches:', store.gruppMatches.groups_matches);
    return store.gruppMatches.groups_matches.sort((a, b) => {
        if (a.active && !b.active) return -1; // Active matches come first
        if (!a.active && b.active) return 1;
        if (!a.is_completed && b.is_completed) return -1; // Not played matches come second
        if (a.is_completed && !b.is_completed) return 1;
        return 0; // No change for matches with the same status
    });
});


onMounted(async () => {
    const response = await store.getGrupp();
    isLoading.value = false;
    if (response == false) {
        errorMessage.value = 'Invalid tournament name. Redirecting...';
        setTimeout(() => router.push('/'), 100);
    }

    if (response == null) {
        errorMessage.value = 'Invalid tournament name. Redirecting...';
        setTimeout(() => router.push('/'), 100);
    }
    
});

function sortTeamsByPoints(teams) {
    return teams.sort((a, b) => b.points - a.points);
}

function formatGroupName(name) {
    return name.split(' ').slice(1).join(' ');
}

</script>

<style scoped>
.done {
    background-color: hsl(220, 19%, 38%);
    color: hsl( 0 10% 88%);
}

.active {
    background-color: hsl(220, 19%, 38%);
    color: hsl( 0 10% 88%);
}
</style>