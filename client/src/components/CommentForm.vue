<script setup>
import { AppState } from '@/AppState';
import { commentService } from '@/services/CommentService';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const account = computed(()=> AppState.account)
const route = useRoute()

const editableCommentData = ref({
    body: '',
    eventId: ''
})

async function createComment(){
    try {
        // @ts-ignore
        editableCommentData.value.eventId = route.params.eventId
      await commentService.createComment(editableCommentData.value)
      editableCommentData.value = {
        body: '',
        eventId: ''
      }
    }
    catch (error){
      Pop.meow(error);
    }
}

</script>


<template>
    <div v-if="account" class="row">
        <form id="create-comment" @submit.prevent="createComment()" class="form-floating p-1 col-md-10 col-12">
            <input v-model="editableCommentData.body" type="text" class="form-control" id="body" placeholder="Post a Comment..." required maxlength="500">
            <label for="body ">Post A Comment...</label>
        </form>
        <div class="col-md-2 col-12 text-center p-3">
            <button form="create-comment" type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>