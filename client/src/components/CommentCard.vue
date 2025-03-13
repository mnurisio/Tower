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
    <div class="row m-2 pt-2 align-items-center comment">
        <div class="col-2 p-0">
            <img class="commentImg mx-auto d-block" :src="comment.creator.picture" :alt="comment.creator.name">
        </div>
        <div class="col-10 ps-0">
            <h6 class="mt-md-2 mt-3 kanit-medium">{{ comment.creator.name }}</h6>
            <div class="mb-2">
                <p class="text-break kanit-light">{{ comment.body }}</p>
            </div>
        </div>
        <div v-if="comment.creatorId == account?.id" class="text-end">
            <button @click="deleteComment(comment.id)" class="btn my-2">Remove</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.commentImg {
    height: 6dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.comment {
    background-color: rgba(255, 255, 255);
    box-shadow: 1px 8px 13px -3px rgba(0, 0, 0, 0.27);
}

button {
    background-color: #DA4C0F;
    color: #F8F6FF;
}

button:hover{
    background-color: #bc410c;
    color: #F8F6FF;
}

div h6{
    color: #696969;
}

div p{
    color: #696969;
}
</style>