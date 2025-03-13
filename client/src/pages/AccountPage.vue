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
  <div class="about text-center container">
    <div v-if="account" class="row justify-content-start align-items-center">
      <div class="col-md-2 col-3">
        <img class="my-2" :src="account.picture" :alt="account.name" />
      </div>
      <div class="col-9 text-start">
        <h1 class="my-2">{{ account.name }}</h1>
      </div>
    </div>
    <div class="container mt-5">
      <section class="row">
        <div class="text-md-start text-center my-2">
          <h3>Your Upcoming Events</h3>
        </div>
        <div v-for="myTicket in myTickets" :key="myTicket.id" class="col-md-3 col-12 text-start my-ticket">
          <EventCard :event="myTicket.event" />
          <div class="text-md-end text-center">
            <button @click="refundTicket(myTicket.id)" class="btn">Unattend</button>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 1px 2px 13px 1px rgba(0, 0, 0, 0.27);
}

.my-ticket{
  position: relative;
}

@media(min-width: 768px){
  button{
    background-color: #5044DE;
    color: #F8F6FF;
    position: absolute;
    bottom: calc(40%);
    right: calc(8%);
  }
}

@media(max-width: 768px){
  button{
    background-color: #5044DE;
    color: #F8F6FF;
    position: absolute;
    bottom: calc(40%);
    right: calc(5%);
  }
}


button:hover{
  background-color: #5044DE;
  color: #F8F6FF;
}

</style>
