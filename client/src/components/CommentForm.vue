<script setup>
import { AppState } from '@/AppState';
import { commentService } from '@/services/CommentService';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const account = computed(() => AppState.account)
const route = useRoute()

const editableCommentData = ref({
    body: '',
    eventId: ''
})

async function createComment() {
    try {
        // @ts-ignore
        editableCommentData.value.eventId = route.params.eventId
        await commentService.createComment(editableCommentData.value)
        editableCommentData.value = {
            body: '',
            eventId: ''
        }
    }
    catch (error) {
        Pop.meow(error);
    }
}

</script>


<template>
    <div v-if="account" class="row">
        <form id="create-comment" @submit.prevent="createComment()" class="col-12">
            <textarea v-model="editableCommentData.body" type="text" class="form-control" id="body"
                placeholder="Tell the people..." required maxlength="500" style="height: 150px"></textarea>
            <label for="body"></label>
        </form>
        <div class="text-end">
            <button form="create-comment" type="submit" class="btn kanit-regular">Post Comment</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

button{
    background-color: #59A369;
    color: #FFFFFF;
}

button:hover{
    background-color: #468152;
    color: #FFFFFF;
}

</style>