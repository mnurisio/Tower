import { dbContext } from "../db/DbContext"


class TowerEventService {


    async createEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator')
        await event.populate('ticketCount')
        return event
    }

    async getAllEvents() {
        const events = await dbContext.TowerEvent.find().populate('creator', 'name picture').populate('ticketCount')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.TowerEvent.findById(eventId).populate('creator').populate('ticketCount')
        return event
    }

    async editEvent(eventId, eventData, userId) {
        const event = await dbContext.TowerEvent.findById(eventId)
        if (event.isCanceled) { throw new Error('cant do that') }
        if (event.creatorId != userId) { throw new Error('cant do that') }
        if (eventData.name) event.name = eventData.name
        if (eventData.description) event.description = eventData.description
        if (eventData.isCanceled) event.isCanceled = !eventData.isCanceled
        await event.save()
        return event
    }

    async cancelEvent(eventId, userId) {
        const event = await dbContext.TowerEvent.findById(eventId)
        if (event.creatorId != userId) { throw new Error('cant do that') }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }

}

export const towerEventService = new TowerEventService()