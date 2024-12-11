import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketService{

   async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('Creating ticket', response.data)
        const ticket = new Ticket(response.data)
        AppState.ticketProfiles.push(ticket)

   }
}

export const ticketService = new TicketService()