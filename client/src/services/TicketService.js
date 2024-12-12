import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketService {

   async getTicketsByEventId(eventId) {
      const response = await api.get(`api/events/${eventId}/tickets`)
      logger.log('getting tickets by eventId', response.data)
      const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
      AppState.ticketProfiles = tickets
   }

   async refundTicket(ticketId) {
      const response = await api.delete(`api/tickets/${ticketId}`)
      logger.log('delete ticket', response.data)
      const ticketToDelete = AppState.myTickets.findIndex(myTicket => myTicket.id == ticketId)
      AppState.myTickets.splice(ticketToDelete, 1)
      AppState.ticketProfiles.splice(ticketToDelete, 1)
   }

   async getMyTickets() {
      const response = await api.get('account/tickets')
      logger.log('getting my tickets', response.data)
      const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
      AppState.myTickets = tickets
   }

   async createTicket(eventData) {
      const response = await api.post('api/tickets', eventData)
      logger.log('Creating ticket', response.data)
      const ticket = new Ticket(response.data)
      AppState.ticketProfiles.push(ticket)
   }
}

export const ticketService = new TicketService()