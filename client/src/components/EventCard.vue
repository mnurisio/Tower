<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { computed } from 'vue';



defineProps({
    event: { type: TowerEvent, required: true }
})

</script>


<template>
    <router-link :to="{name: 'Event Details', params: {eventId: event.id}}">
        <div :style="{backgroundImage: `url(${event.coverImg})`}" class="card my-2 cardImg shadow text-light d-flex justify-content-end">
            <div class="p-1">
                <div class="card-body cardBG px-md-3 py-md-3" :class="{cancelledCard: event.isCanceled}">
                    <h5 class="card-title mb-0 fw-bold">{{ event.name }}</h5>
                    <b class="mb-0 mt-1">{{ event.creator.name }}</b>
                </div>
            </div>
        </div>
    </router-link>
</template>


<style lang="scss" scoped>

.cardImg{
    min-height: 15rem;
    background-size: cover;
    background-position: center;
}

.cardBG{
    background-color: rgba(0, 0, 0, 0.631);
    backdrop-filter: blur(5px);
    height: 5rem;
    border-radius: 10px;
}

.cancelledCard::after{
    background-color: rgba(0, 0, 0, 0.631);
    backdrop-filter: blur(5px);
    height: 5rem;
    border-radius: 10px;
    border: 2px 2px solid red;
}
</style>