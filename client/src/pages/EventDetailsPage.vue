<script setup>
import { AppState } from '@/AppState';
import CommentForm from '@/components/CommentForm.vue';
import { commentService } from '@/services/CommentService';
import { ticketService } from '@/services/TicketService';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const ticketProfiles = computed(() => AppState.ticketProfiles)
const isAttending = computed(() => ticketProfiles.value.some(ticketProfile => ticketProfile.accountId == account.value?.id))
const comments = computed(() => AppState.comments)

const route = useRoute()

const remainingTickets = computed(() => Math.floor(event.value?.capacity - event.value?.ticketCount))


watch(route, () => {
    getEventById()
    getTicketsByEventId()
    getCommentsByEventId()
}, { immediate: true })

async function getEventById() {
    try {
        const eventId = route.params.eventId
        await towerEventService.getEventById(eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.error('getting event by ID', error)
    }
}

async function cancelEvent() {
    try {
        const confirm = await Pop.confirm('Are you sure you want to cancel this event?', "You're gonna ruin a lot of people's nights :/", "Yeah, I wanna create chaos")
        if (!confirm) return
        const eventId = route.params.eventId
        await towerEventService.cancelEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function createTicket() {
    try {
        const eventData = { eventId: route.params.eventId }
        await ticketService.createTicket(eventData)
        event.value.ticketCount++
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getTicketsByEventId() {
    try {
        const eventId = route.params.eventId
        await ticketService.getTicketsByEventId(eventId)
    }
    catch (error) {
        Pop.meow(error);
    }
}

async function getCommentsByEventId() {
    try {
        const eventId = route.params.eventId
        await commentService.getCommentsByEventId(eventId)
    }
    catch (error) {
        Pop.meow(error);
    }
}

async function deleteComment(commentId) {
    try {
        const confirm = await Pop.confirm('Are you sure you want to delete your comment?')
        if (!confirm) { return }
        await commentService.deleteComment(commentId)
    }
    catch (error) {
        Pop.meow(error);
    }
}

</script>


<template>
    <div v-if="event" class="container">
        <section class="row justify-content-center my-3">
            <div class="col-md-12 col-11 heroImg m-2"
                :class="{ canceledImg: event.isCanceled, soldOutImg: remainingTickets == 0 }"
                :style="{ backgroundImage: `url(${event.coverImg})` }">
            </div>
        </section>
        <section class="row">
            <div class="col-md-7 col-12 align-items-center">
                <h6 v-if="event.creatorId == account?.id" class="text-end"><button @click="cancelEvent()"
                        class="btn btn-danger"><i class="mdi mdi-delete-outline"></i></button></h6>
                <div class="text-md-start text-center">
                    <div class="fw-bold fs-3 p-2">{{ event.name }} <h5 class="my-2">Hosted by {{ event.creator.name }}
                        </h5>
                    </div>
                    <div class="mb-2"><span class="rounded-pill px-3 bg-primary text-light fs-5 ">{{ event.type
                            }}</span></div>
                    <div class="mb-2" v-if="isAttending"><span
                            class="rounded-pill px-3 bg-success text-dark fs-5">You're
                            going!!!</span></div>
                </div>
                <p class="mb-2 text-center text-md-start">{{ event.description }}</p>
                <h4 class="text-center text-md-start p-1 mb-0">Event Date</h4>
                <h6 class="m-0 p-1 text-center text-md-start">{{ event.startDate.toLocaleDateString() }}</h6>
                <h4 class="text-center text-md-start p-1 mb-0 mt-2">Location</h4>
                <h6 class="m-0 p-1 text-center text-md-start"><i class="mdi mdi-map-outline"></i> {{ event.location }}
                </h6>
                <hr>
                <h4 class="text-center text-md-start p-1 mb-3">Comment Section</h4>
                <div>
                    <CommentForm />
                </div>
                <div class="card-body">
                    <div class="row justify-content-start">
                        <div v-for="comment in comments" :key="comment.id" class="col-12 my-2 align-items-center">
                            <div class="row mb-2 align-items-center border border-dark border-2 p-2 m-1">
                                <img class="commentImg col-md-2 col-3 px-md-4" :src="comment.creator.picture"
                                    :alt="comment.creator.name">
                                <span class="ms-md-3 ms-0 col-12 col-md-9">
                                        <h6  class="mt-md-2 mt-3">{{ comment.creator.name }}</h6>
                                    <div class="">
                                        <p class="commentBody text-break">{{ comment.body }}</p>
                                    </div>
                                </span>
                                <div v-if="comment.creatorId == account?.id" class="text-end">
                                    <button @click="deleteComment(comment.id)" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-12">
                <div class="p-4">
                    <div class="text-center card">
                        <span class="fw-bold fs-3 mt-2">Get Tickets!</span>
                        <span class="fw-bold fs-6 mt-2">Max Capacity is {{ event.capacity }}</span>
                        <div class="card-body">
                            <div>
                                <button v-if="!event.isCanceled && remainingTickets > 0 && account" @click="createTicket()"
                                    class="btn btn-success">Attend
                                    Event</button>
                                <button v-if="event.isCanceled" disabled class="btn btn-danger">Sorry, this event has
                                    been
                                    cancelled</button>
                                <button v-if="remainingTickets == 0" disabled class="btn btn-info">Sorry, this event is
                                    sold out</button>
                            </div>
                            <h6 v-if="!event.isCanceled && remainingTickets > 0" class="mt-2 mb-0">Only {{
                                remainingTickets }} tickets left!</h6>
                            <h6 v-if="remainingTickets == 0" class="mt-2 mb-0">This event is sold out!</h6>
                        </div>
                    </div>
                </div>
                <div class="m-3 p-2">
                    <div class="card attendanceCard">
                        <div class="text-center my-2">
                            <span class="fw-bold fs-3">Attendees</span>
                        </div>
                        <div class="card-body">
                            <div class="row justify-content-start">
                                <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id"
                                    class="col-12 mb-2">
                                    <img class="profileImg" :src="ticketProfile.profile.picture"
                                        :alt="ticketProfile.profile.name">
                                    <span class="ms-4">{{ ticketProfile.profile.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped>
.heroImg {
    height: 25rem;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    position: relative;
}

.canceledImg::after {
    left: 0;
    position: absolute;
    content: 'CANCELLED';
    font-size: 50px;
    font-weight: bolder;
    color: red;
    text-align: center;
    padding-top: calc(12.5% - 10px);
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border-color: red;
    background-color: rgba(0, 0, 0, 0.579);
    backdrop-filter: blur(15px);
}

.soldOutImg::after {
    left: 0;
    position: absolute;
    content: 'SOLD OUT';
    font-size: 50px;
    font-weight: bolder;
    color: rgb(0, 157, 255);
    text-align: center;
    padding-top: calc(12.5% - 10px);
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border-color: red;
    background-color: rgba(0, 0, 0, 0.579);
    backdrop-filter: blur(15px);
}

.canceledText {
    text-shadow: 1px 1px 2px black;
}

.profileImg {
    height: 5dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.commentImg {
    height: 6dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.attendanceCard {
    height: 30dvh;
    overflow-y: scroll;
}
</style>