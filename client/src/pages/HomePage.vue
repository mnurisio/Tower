<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const events = computed(()=> AppState.towerEvents)

onMounted(()=> {
  getEvents()
})

async function getEvents(){
  try {
    await towerEventService.getEvents()
  }
  catch (error){
    Pop.meow(error);
  }
}

</script>

<template>
  <div class="container">
    <section class="row">
      <h3 class="my-3">Upcoming Events</h3>
      <hr>
    </section>
    <section class="row">
      <div class="col-md-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
