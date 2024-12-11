import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class TicketService {
   
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        await ticket.populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return ticket
    }

    async getMyEventTickets(userId) {
        const myTickets = await dbContext.Ticket.find({ accountId: userId }).populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return myTickets
    }

   async getTotalEventTickets(eventId) {
        const tickets = await dbContext.Ticket.find({eventId: eventId}).populate('profile', 'name picture')
        return tickets
    }

   async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Ticket.findById(ticketId)
        if(ticketToDelete == null){
            throw new Error(`invalid ticket ID: ${ticketId}`)
        }
        if(ticketToDelete.accountId != userId){
            throw new Forbidden('YOU SHALL NOT PASS!!!')
        }
        await ticketToDelete.deleteOne()
        return 'Ticket has been deleted'
    }

}

export const ticketService = new TicketService()