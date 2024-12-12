<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { ticketService } from '@/services/TicketService.js';
import EventCard from '@/components/EventCard.vue';

const account = computed(() => AppState.account)
const myTickets = computed(() => AppState.myTickets)
const events = computed(()=> AppState.towerEvents)

onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
  }
  catch (error) {
    Pop.meow(error);
  }
}

async function refundTicket(ticketId) {
  try {
    const confirm = await Pop.confirm('You sure you want to refund your ticket', 'This event will be remembered for eons to come', "Yes, I don't want to be a part of history")
    if (!confirm) { return }
    await ticketService.refundTicket(ticketId)
  }
  catch (error) {
    Pop.meow(error);
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1 class="my-2">Welcome {{ account.name }}</h1>
      <img class="rounded my-2" :src="account.picture" alt="" />
    </div>
    <div class="container">
      <section class="row">
        <div class="text-md-start text-center my-2">
          <h3>Your Upcoming Events</h3>
          <hr>
        </div>
        <div v-for="myTicket in myTickets" :key="myTicket.id" class="col-md-3 col-12 text-start">
          <EventCard :event="myTicket.event" />
          <div class="text-md-end text-center">
            <button @click="refundTicket(myTicket.id)" class="btn btn-danger my-1">Refund Ticket <i
                class="mdi mdi-arrow-up-thick"></i></button>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
