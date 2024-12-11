import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketService";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)


    }
    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            ticketData.accountId = request.userInfo.id
            const ticket = await ticketService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

     /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */
    async deleteTicket(request, response, next){
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const ticketToDelete = await ticketService.deleteTicket(ticketId, userId)
            response.send(ticketToDelete)
        } catch (error) {
            next(error)
        }
    }
}