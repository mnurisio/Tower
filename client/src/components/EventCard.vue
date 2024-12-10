<script setup>
import { AppState } from '@/AppState';
import { TowerEvent } from '@/models/TowerEvent';
import { computed } from 'vue';


defineProps({
    event: { type: TowerEvent, required: true }
})

</script>


<template>
    <div class="card my-2 eventCard shadow">
        <img :style="{backgroundImage: `url(${event.coverImg})`}" class="card-img-top img-fluid cardImg" :alt="event.name">
        <div class="card-body">
            <h5 class="card-title">{{ event.name }}</h5>
            <p>{{ event.creator.name }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.eventCard{
    overflow-y: scroll;
}

.cardImg{
    min-height: 15rem;
    background-size: cover;
    background-position: center;
}
</style>