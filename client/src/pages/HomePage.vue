<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.towerEvents)

onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await towerEventService.getEvents()
  }
  catch (error) {
    Pop.meow(error);
  }
}

</script>

<template>
  <div class="container">
    <section class="row">
      <h1 class="text-center my-2">Welcome to Tower!</h1>
      <h3 class="text-center my-2">Browse Events or Create One of Your Own</h3>
      <hr>
    </section>
    <section class="row justify-content-evenly">
      <div class="col-5">Browse Events</div>
      <div class="col-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title my-2"><i class="mdi mdi-plus-thick"></i> Create an Event</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary my-2">Create an event and invite your friends!</h6>
            <p class="text-primary my-2">Add Event</p>
          </div>
        </div>
      </div>
    </section>
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

<style scoped lang="scss"></style>
