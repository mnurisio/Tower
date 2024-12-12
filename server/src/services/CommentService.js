import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { towerEventService } from "./TowerEventService"


class CommentService {

    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comment.findById(commentId)
        if (commentToDelete == null) {
            throw new Error(`invalid ticket ID: ${commentId}`)
        }
        if (commentToDelete.creatorId != userId) {
            throw new Forbidden('YOU SHALL NOT PASS!!!')
        }
        await commentToDelete.deleteOne()
        return 'Comment has been deleted'

    }

    async getCommentsByEventId(eventId) {
        const comments = dbContext.Comment.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }

    async createComment(commentData) {
        const event = await towerEventService.getEventById(commentData.eventId)
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }
}

export const commentService = new CommentService()