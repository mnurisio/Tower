<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { accountService } from '@/services/AccountService';
import { computed } from 'vue';

const account = computed(() => AppState.account)

defineProps({
    event: { type: TowerEvent, required: true }
})

</script>


<template>
    <router-link :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <div class="card mt-2 mb-4">
            <img :src=event.coverImg class="cardImg" alt="...">
            <div v-if="event.isCanceled && event.capacity != event.ticketCount" class="cancelledCard px-3 kanit-regular">
                CANCELLED
            </div>
            <div v-if="event.capacity == event.ticketCount && !event.isCanceled" class="soldOutCard px-3 kanit-regular">
                SOLD OUT
            </div>
            <div v-if="event.capacity == event.ticketCount && event.isCanceled">
                <div class="cancelledSoldOutCard px-3 kanit-regular">
                CANCELLED
            </div>
            <div class="soldOutCard px-3 kanit-regular">
                SOLD OUT
            </div>
            </div>
            <div class="card-body px-0">
                <div class="kanit-regular">
                    <h5 class="mb-0">{{ event.name }}</h5>
                </div>
                <div v-if="account?.id == event.creatorId" class="creator-name1 kanit-regular mb-0">
                    <span>Hosted by {{ event.creator.name }}</span>
                </div>
                <div v-else class="creator-name2 kanit-regular">
                    <span>Hosted by {{ event.creator.name }}</span>
                </div>
                <div class="kanit-extralight text-secondary">
                    <span>{{event.startDate.toLocaleDateString()}} - {{ event.location }}</span>
                </div>
                <div class="kanit-light">
                    <span>{{ event.ticketCount }} attending</span>
                </div>
            </div>
        </div>
    </router-link>
</template>


<style lang="scss" scoped>

.card{
    border-radius: 0.5rem;
    background-color: #FFFFFF;
    border: none;
}

.card-body{
    background-color: #FFFFFF;
}

.cardImg {
    min-height: 15rem;
    background-size: cover;
    background-position: center;
    border-radius: 0.5rem;
    height: 15rem;
    position: relative;
}

.cardBG {
    background-color: rgba(0, 0, 0, 0.631);
    backdrop-filter: blur(5px);
    height: 5rem;
    border-radius: 10px;
}

.cancelledCard{
    background-color: #DA4C0F;
    color: white;
    box-shadow: 1px 1px 1px black;
    border-radius: 0.25rem;
    position: absolute;
    bottom: calc(38%);
    left: calc(3%);
}

.soldOutCard{
    background-color: #5044DE;
    color: white;
    box-shadow: 1px 1px 1px black;
    border-radius: 0.25rem;
    position: absolute;
    bottom: calc(38%);
    left: calc(3%);
}

.cancelledSoldOutCard{
    background-color: #DA4C0F;
    color: white;
    box-shadow: 1px 1px 1px black;
    border-radius: 0.25rem;
    position: absolute;
    bottom: calc(46%);
    left: calc(3%);
}

.creator-name1{
    color: #59A369;
}

.creator-name2{
    color: #5044DE;
}
</style>