<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const events = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.towerEvents
  return AppState.towerEvents.filter(events => events.type == activeFilterCategory.value)
})
const account = computed(() => AppState.account)


const activeFilterCategory = ref('all')

const categories = [
  { name: 'all' },
  { name: 'concert' },
  { name: 'convention' },
  { name: 'sport' },
  { name: 'digital' },
]

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
  <div class="picture-bg">
    <div class="container-fluid bg-hero d-flex flex-column justify-content-center">
      <div class="row p-5 mt-5 text-bg">
        <div class="col-12">
          <h2 class="event-text">Event management for people, by people</h2>
        </div>
        <div class="col-md-6">
          <h4 class="event-text">Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day- log in and join the fun.</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <section class="row">
      <!-- <h1 class="text-center my-2">Welcome to Tower!</h1> -->
      <div class="my-4 text-start">
        <h3 class="my-2">Browse Events or Create One of Your Own</h3>
      </div>
      <hr>
    </section>
    <section class="row justify-content-evenly align-items-center">
      <div class="col-md-5 col-12">
        <div class="row justify-content-center p-3">
          <div @click="activeFilterCategory = category.name" role="button" v-for="category in categories"
            :key="category.name" class="col-md-4 my-3 text-center bg-primary-subtle rounded-pill mx-2 p-1">
            <span class="fs-5 text-capitalize">{{ category.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="account" class="col-md-5 col-12">
        <div role="button" data-bs-toggle="modal" data-bs-target="#eventModal" class="card">
          <div class="card-body">
            <h5 class="card-title my-2"><i class="mdi mdi-plus-thick"></i> Create an Event</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary my-2">Create an event and invite your friends!</h6>
            <p class="text-primary my-2">Add Event</p>
          </div>
        </div>
      </div>
    </section>
    <section class="row my-md-2 my-3 mx-md-1 mx-2 text-md-start text-center">
      <h3 class="my-3">Upcoming Events</h3>
      <hr>
    </section>
    <section class="row">
      <div class="col-md-4 my-2 p-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

.bg-hero{
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvcm1hbCUyMHBhcnR5fGVufDB8fDB8fHwy');
  background-size: cover;
  background-position: center;
  height: 50em;
  // opacity: 50%;
}

.text-bg{
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.312) 50%, rgba(0, 0, 0, 0.0) 0%);
  margin-left: 1em;
}

.event-text{
  text-shadow: 2px 2px 2px black;
  color: #F8F6FF;
}

</style>
