<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const event = computed(()=> AppState.activeEvent)


const route = useRoute()

watch(route, ()=> {
    getEventById()
}, {immediate: true})

async function getEventById(){
    try {
      const eventId = route.params.eventId
      await towerEventService.getEventById(eventId)
    }
    catch (error){
      Pop.error(error);
      logger.error('getting event by ID', error)
    }
}

</script>


<template>
<div v-if="event" class="container">
    <section class="row justify-content-center my-3">
        <div class="col-12">
            <img class="img-fluid heroImg" :src="event.coverImg" :alt="event.name">
        </div>
    </section>
    <section class="row">
        <div class="col-7">
            <h2>{{ event.name }}</h2>
            <p>{{ event.description }}</p>
        </div>
    </section>
</div>
</template>


<style lang="scss" scoped>
.heroImg{
    height: 30rem;
    object-fit: cover;
    object-position: center;
    width: 100%;
}
</style>