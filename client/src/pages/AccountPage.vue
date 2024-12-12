<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { ticketService } from '@/services/TicketService.js';
import EventCard from '@/components/EventCard.vue';

const account = computed(() => AppState.account)
const myTickets = computed(() => AppState.myTickets)

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

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
    </div>
    <div class="container">
      <section class="row">
        <div v-for="myTicket in myTickets" :key="myTicket.id" class="col-3">
          <EventCard :event="myTicket.event"/>
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
