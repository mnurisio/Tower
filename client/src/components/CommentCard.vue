<script setup>
import { AppState } from '@/AppState';
import { Comment } from '@/models/Comments';
import { commentService } from '@/services/CommentService';
import Pop from '@/utils/Pop';
import { computed } from 'vue';


const account = computed(() => AppState.account)


defineProps({
    comment: { type: Comment, required: true }
})


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
    <div class="row mb-2 align-items-center p-2 m-1 comment">
        <img class="commentImg col-md-2 col-3 px-md-4" :src="comment.creator.picture" :alt="comment.creator.name">
        <span class="ms-md-3 ms-0 col-12 col-md-9">
            <h6 class="mt-md-2 mt-3">{{ comment.creator.name }}</h6>
            <div class="">
                <p class="text-break">{{ comment.body }}</p>
            </div>
        </span>
        <div v-if="comment.creatorId == account?.id" class="text-end">
            <button @click="deleteComment(comment.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

.commentImg {
    height: 6dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.comment{
    background-color: rgba(255, 255, 255);
    box-shadow: 1px 8px 13px -3px rgba(0, 0, 0, 0.27);
}

</style>