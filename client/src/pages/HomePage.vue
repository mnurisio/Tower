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
      <div class="row p-5 mt-5 text-bg kanit-regular">
        <div class="col-12">
          <h2 class="event-text">Event management for people, by people</h2>
        </div>
        <div class="col-md-6">
          <h4 class="event-text">Whatever your interest, from hiking and reading to networking and skill sharing, there
            are thousands of people who share it on Tower. Events are happening every day- log in and join the fun.</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <section>
      <div class="mt-4 text-start">
        <h3 class="kanit-medium">Browse Events</h3>
      </div>
    </section>
    <section class="row align-items-center">
      <div class="col-12">
        <div class="row justify-content-evenly p-3">
          <div @click="activeFilterCategory = category.name" role="button" v-for="category in categories"
            :key="category.name" class="col-md-2 my-1 text-center mx-2 p-1 kanit-medium">
            <div class="text-capitalize categoryBox p-3">
              <div v-if="category.name == 'all'"><i class="mdi mdi-infinity fs-3"></i></div>
              <div v-if="category.name == 'concert'"><i class="mdi mdi-guitar-electric fs-3"></i></div>
              <div v-if="category.name == 'convention'"><i class="mdi mdi-account-group fs-3"></i></div>
              <div v-if="category.name == 'sport'"><i class="mdi mdi-soccer fs-3"></i></div>
              <div v-if="category.name == 'digital'"><i class="mdi mdi-television fs-3"></i></div>
              <div class="fs-5">{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="account">
      <div>
        <h3 class="kanit-medium">Create Event</h3>
      </div>
      <div class="row my-3">
        <div role="button" data-bs-toggle="modal" data-bs-target="#eventModal" class="card create-card px-0 mx-2 col-md-5">
          <div class="card-body">
            <h5 class="card-title mb-2 kanit-regular"><i class="mdi mdi-plus-thick fs-3"></i> Start an event and invite
              your friends</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary my-2 kanit-light">Create your own Tower event, and draw
              from a community of millions</h6>
            <p class="my-2 kanit-light">Create an event</p>
          </div>
        </div>
      </div>
    </div>
    <section class="text-md-start text-center">
      <h3 class="mb-0 kanit-medium">Upcoming Events</h3>
    </section>
    <section class="row">
      <div class="col-md-4 mb-2 p-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.bg-hero {
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvcm1hbCUyMHBhcnR5fGVufDB8fDB8fHwy');
  background-size: cover;
  background-position: center;
  height: 50em;
}

.text-bg {
  margin-left: 1em;
}

.event-text {
  text-shadow: 2px 2px 2px black;
  color: #F8F6FF;
}

.create-card{
  border: none;
}

.categoryBox {
  background-color: #F8F6FF;
}

.mdi-infinity {
  color: #59A369;
}

.mdi-guitar-electric {
  color: #903286;
}

.mdi-account-group {
  color: #5044DE;
}

.mdi-soccer {
  color: #4B7DC8;
}

.mdi-television {
  color: #DA4C0F;
}

.card-body {
  background-color: #F8F6FF;
}

.card-title i {
  color: #59A369;
}

.card-body p {
  color: #59A369;
}
</style>
