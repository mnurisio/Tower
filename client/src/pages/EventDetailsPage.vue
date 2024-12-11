<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const event = computed(()=> AppState.activeEvent)
const account = computed(()=> AppState.account)

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

async function cancelEvent(){
    try {
        const confirm = await Pop.confirm('Are you sure you want to cancel this event?', "You're gonna ruin a lot of people's nights :/", "Yeah, I wanna create chaos")
        if(!confirm) return
        const eventId = route.params.eventId
        await towerEventService.cancelEvent(eventId)
    }
    catch (error){
      Pop.error(error);
    }
}

</script>

//TODO - ask mick/jeremy about the dropdown for edit/delete AND blurred background image for cancelled events
<template>
<div v-if="event" class="container">
    <section class="row justify-content-center my-3">
        <div v-if="!event.isCanceled" class="col-12 heroImg" :style="{backgroundImage: `url(${event.coverImg})`}">
        </div>
        <div v-if="event.isCanceled" class="col-12 text-center align-content-center canceledImg" :style="{backgroundImage: `url(${event.coverImg})`}">
            <h1 class="text-danger canceledText"><b>CANCELLED</b></h1>
        </div>
    </section>
    <section class="row">
        <div class="col-7 align-items-center">
            <h6 v-if="event.creatorId == account?.id" class="text-end"><button @click="cancelEvent()" class="btn btn-danger"><i class="mdi mdi-delete-outline"></i></button></h6>
            <span class="fw-bold fs-3 me-3">{{ event.name }}</span>
            <span class="rounded-pill px-3 bg-primary text-light fs-5">{{ event.type }}</span>
            <p>{{ event.description }}</p>
            <h4>Date and Time</h4>
            <h6>{{ event.startDate }}</h6>
            <h4>Location</h4>
            <h6><i class="mdi mdi-map-outline"></i> {{ event.location }}</h6>
            <hr>
            <h4>Comment Section</h4>

        </div>
    </section>
</div>
</template>


<style lang="scss" scoped>
.heroImg{
    height: 25rem;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
}

.canceledImg{
    height: 25rem;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    border-color: red;
    background-color: rgba(0, 0, 0, 0.579);
    backdrop-filter: blur(15px);
}

.canceledText{
    text-shadow: 1px 1px 2px black;
}
</style>