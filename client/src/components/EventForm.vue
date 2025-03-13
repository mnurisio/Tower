<script setup>
import { towerEventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const types = ['concert', 'convention', 'sport', 'digital']

const editableEventData = ref({
    name: '',
    description: '',
    coverImg: '',
    location: '',
    capacity: 0,
    startDate: '',
    type: ''
})

const router = useRouter()

async function createEvent() {
    try {
        const event = await towerEventService.createEvent(editableEventData.value)
        editableEventData.value = {
            name: '',
            description: '',
            coverImg: '',
            location: '',
            capacity: 0,
            startDate: '',
            type: ''
        }
        Modal.getInstance('#eventModal').hide()
        router.push({name: 'Event Details', params: {eventId: event.id}})
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <form @submit.prevent = createEvent() id="event-submit">
        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name" required minlength="3"
                maxlength="50">
            <label for="name">Event Name</label>
        </div>
        <div class="form-floating mb-3">
            <textarea v-model="editableEventData.description" class="form-control" id="description" placeholder="Event Description" required minlength="15"
                maxlength="1000"></textarea>
            <label for="description">Event Description</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg" placeholder="Image" required maxlength="1000">
            <label for="coverImg">Event Cover Image</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="text" class="form-control" id="location" placeholder="Event Location" required minlength="1"
                maxlength="5000">
            <label for="location">Event Location</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity" placeholder="Capacity" required min="1" max="5000">
            <label for="capacity">Capacity</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.startDate" type="date" class="form-control" id="startDate" placeholder="Event Date" required>
            <label for="startDate">Event Date</label>
        </div>
        <div class="form-floating mb-3">
            <select v-model="editableEventData.type" class="form-select text-capitalize" id="type" aria-label="Event Type" required>
                <option selected value="" disabled>Choose a Type</option>
                <option v-for="type in types" :key="type" :value="type" class="text-capitalize">
                    {{ type }}
                </option>
            </select>
            <label for="type">Event Type</label>
        </div>
    </form>
    <div>
        <button form="event-submit" class="btn" type="submit">Create</button>
    </div>
</template>


<style lang="scss" scoped>

button{
    background-color: #5044DE;
    color: #F8F6FF;
}

button:hover{
    background-color: #4136b4;
    color: #F8F6FF;
}

</style>