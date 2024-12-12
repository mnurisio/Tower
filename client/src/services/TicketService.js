import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketService {

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