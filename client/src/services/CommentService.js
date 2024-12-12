import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Comment} from "../models/Comments.js"

class CommentService {

   async deleteComment(commentId) {
       const response = await api.delete(`api/comments/${commentId}`)
       logger.log('deleting comment', response.data)
       const commentToDelete = AppState.comments.findIndex(comment => comment.id == commentId)
       AppState.comments.splice(commentToDelete, 1)
    }

    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        logger.log('creating comment', response.data)
        const comment = new Comment(response.data)
        AppState.comments.push(comment)
    }

    async getCommentsByEventId(eventId) {
        AppState.comments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('getting comments by eventId', response.data)
        const comments = response.data.map(commentPOJO => new Comment(commentPOJO))
        AppState.comments = comments
    }
}

export const commentService = new CommentService()