<script setup>
import { AppState } from '@/AppState';
import CommentCard from '@/components/CommentCard.vue';
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
        const confirm = await Pop.confirm('Are you sure you want to cancel this event?')
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



</script>


<template>
    <div v-if="event" class="container">
        <section class="row justify-content-center my-3">
            <div class="col-md-12 col-11 heroImg m-2" :style="{ backgroundImage: `url(${event.coverImg})` }">
                <div class="bg-blur row" :class="{ canceledImg: event.isCanceled, soldOutImg: remainingTickets == 0 }">
                    <img class="img-two mx-auto d-block" :src="event.coverImg" alt="">
                </div>
            </div>
        </section>





        <section class="row justify-content-between">
            <div class="col-md-7 col-12 align-items-center">
                <div class="text-md-start text-center order-1">
                    <div class="row justify-content-between fw-bold fs-3 pt-2 pe-md-2 pe-0 kanit-regular">
                        <div class="col-12">
                            {{ event.name }}
                            <span v-if="event.creatorId == account?.id" :hidden="event.isCanceled"
                                class="ps-0 text-end">
                                <span type="button" data-bs-toggle="dropdown">
                                    <i class="mdi mdi-dots-horizontal fs-3 dropdown-btn"></i>
                                </span>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div @click="cancelEvent()" class="dropdown-item" type="button">Cancel Event
                                        </div>
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                    <div v-if="account?.id == event.creatorId" class="mb-3 creator-name1">
                        <h5>Hosted by {{ event.creator.name }}</h5>
                    </div>
                    <div v-else class="mb-3 creator-name2">
                        <h5>Hosted by {{ event.creator.name }}</h5>
                    </div>
                    <div v-if="event.type == 'sport'" class="mb-2 kanit-regular"><span class="p-1 event-sport">{{
                        event.type }}</span></div>
                    <div v-if="event.type == 'concert'" class="mb-2 kanit-regular"><span class="p-1 event-concert">{{
                        event.type }}</span></div>
                    <div v-if="event.type == 'convention'" class="mb-2 kanit-regular"><span
                            class="p-1 event-convention">{{
                                event.type }}</span></div>
                    <div v-if="event.type == 'digital'" class="mb-2 kanit-regular"><span class="p-1 event-digital">{{
                        event.type }}</span></div>
                    <p class="mb-2 text-center text-md-start kanit-light">{{ event.description }}</p>
                    <h4 class="event-details text-center text-md-start py-1 pe-1 mb-0 kanit-regular">Event Date</h4>
                    <h6 class="event-details m-0 py-1 pe-1 text-center text-md-start kanit-regular"><i
                            class="mdi mdi-map-marker"></i> {{ event.startDate.toLocaleDateString() }}</h6>
                    <h4 class="event-details text-center text-md-start py-1 pe-1 mb-0 mt-2 kanit-regular">Location</h4>
                    <h6 class="event-details m-0 py-1 pe-1 text-center text-md-start kanit-regular"><i
                            class="mdi mdi-map-outline"></i> {{ event.location }}
                    </h6>
                </div>
                <div class="mt-5">
                    <h4 class="comment-title text-center text-md-start p-1 mb-3 kanit-medium">See what folks are
                        saying...</h4>
                </div>
                <div class="comment-card card-body container p-4 order-md-2 order-3">
                    <CommentForm />
                    <div class="row justify-content-start">
                        <div v-for="comment in comments" :key="comment.id" class="bg-page col-12 my-2 align-items-center">
                            <CommentCard :comment="comment" />
                        </div>
                    </div>
                </div>
            </div>



            <div class="col-md-3 col-12 pe-md-0">
                <div class="ps-md-4 mt-md-0 mt-4">
                    <div class="text-center card bg-page">
                        <span class="kanit-regular fs-5 mt-2">Interested in going?</span>
                        <span class="kanit-light fs-6 mb-3">Max Capacity is {{ event.capacity }}</span>
                        <div class="card-body kanit-light">
                            <button v-if="!event.isCanceled && remainingTickets > 0" @click="createTicket()"
                                class="btn attend-btn w-50" :disabled="account == null">Attend</button>
                            <button v-else disabled class="btn attend-btn w-50">Attend</button>
                        </div>
                    </div>
                    <div class="row justify-content-between py-md-0 py-2">
                        <div class="remaining-tix kanit-medium mt-2 mb-0 col-6 text-md-start text-center" v-if="isAttending">
                            <h6>Attending</h6>
                        </div>
                        <div class="not-attending kanit-medium mt-2 mb-0 col-6 text-md-start text-center" v-else>
                            <h6>Not Attending</h6>
                        </div>

                        <div class="text-end col-6 text-md-start text-center">
                            <h6 v-if="!event.isCanceled && remainingTickets > 0" class="mt-2 mb-0"> <span
                                    class="remaining-tix">{{ remainingTickets }}</span> spots left!</h6>
                            <h6 v-if="remainingTickets == 0" class="mt-2 mb-0">This event is sold out!</h6>
                        </div>
                    </div>
                </div>
                <div class="ms-md-3 my-md-3 ps-md-2 py-md-2">
                    <div class="card attendanceCard">
                        <div class="text-center my-2">
                            <span class="kanit-regular fs-3">Attendees</span>
                        </div>
                        <div class="card-body">
                            <div class="row justify-content-start">
                                <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id"
                                    class="col-12 mb-2">
                                    <img class="profileImg" :src="ticketProfile.profile.picture"
                                        :alt="ticketProfile.profile.name">
                                    <span class="ms-4 kanit-extralight">{{ ticketProfile.profile.name }}</span>
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
    height: 30rem;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
}

.img-two {
    object-fit: cover;
    object-position: center;
    height: 30rem;
    width: 75%;
}

@media(min-width: 768px) {
    .bg-blur {
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(30px);
        border-radius: 10px;
    }
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
    background-color: rgba(0, 0, 0, 0.878);
    backdrop-filter: blur(10px);
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



.attendanceCard {
    height: 30dvh;
    overflow-y: scroll;
}

.attendanceCard::-webkit-scrollbar {
    width: 8px;
}


.attendanceCard::-webkit-scrollbar-track {
    background: #F8F6FF;
    border-radius: 4px;
}


.attendanceCard::-webkit-scrollbar-thumb {
    background: #5044DE;
    border-radius: 4px;
}

.dropdown-menu div {
    cursor: pointer;
}

.dropdown-btn {
    color: #696969;
}

.card {
    border: none;
    background-color: #F8F6FF;
}

.creator-name1 {
    color: #59A369;
}

.creator-name2 {
    color: #5044DE;
}

.remaining-tix {
    color: #59A369;
}

.not-attending {
    color: #5044DE;
}

.attend-btn {
    background-color: #5044DE;
    color: #F8F6FF;
}

.event-sport {
    background-color: rgba(72, 102, 147, 0.2);
    color: rgba(49, 102, 182, 1);
    border-radius: 0.25rem;
}

.event-concert {
    background-color: rgb(255, 236, 252);
    color: rgba(144, 50, 134, 1);
    border-radius: 0.25rem;
}

.event-convention {
    background-color: rgb(238, 236, 254);
    color: rgba(80, 68, 222, 1);
    border-radius: 0.25rem;
}

.event-digital {
    background-color: rgb(255, 234, 225);
    color: rgba(218, 76, 15, 1);
    border-radius: 0.25rem;
}

.event-details {
    color: #696969;
}

.event-details i {
    color: #5044DE;
}

.comment-card {
    background-color: #F8F6FF;
}

.comment-title {
    color: #484848;
}


</style>