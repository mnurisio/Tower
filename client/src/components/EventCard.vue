<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { computed } from 'vue';



defineProps({
    event: { type: TowerEvent, required: true }
})

</script>


<template>
    <router-link :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <div :style="{ backgroundImage: `url(${event.coverImg})` }"
            class="card my-2 cardImg shadow text-light d-flex justify-content-end">
            <div class="p-1">
                <div v-if="event.isCanceled" class="mb-2">
                    <b class="rounded-pill px-3 bg-danger text-dark fs-6">CANCELLED</b>
                </div>
                <div v-if="event.capacity == event.ticketCount" class="mb-2">
                    <b class="rounded-pill px-3 bg-info text-dark fs-6">SOLD OUT</b>
                </div>
                <div class="card-body cardBG px-md-3 py-md-3">
                    <h5 class="card-title mb-0 fw-bold">{{ event.name }}</h5>
                    <b class="mb-0 mt-1">{{ event.creator.name }}</b>
                </div>

            </div>
        </div>
    </router-link>
</template>


<style lang="scss" scoped>
.cardImg {
    min-height: 15rem;
    background-size: cover;
    background-position: center;
}

.cardBG {
    background-color: rgba(0, 0, 0, 0.631);
    backdrop-filter: blur(5px);
    height: 5rem;
    border-radius: 10px;
}

.cancelledCard::before {
    background-color: rgba(0, 0, 0, 0.631);
    backdrop-filter: blur(5px);
    height: 5rem;
    border-radius: 10px;
    border: 2px 2px solid red;
}
</style>