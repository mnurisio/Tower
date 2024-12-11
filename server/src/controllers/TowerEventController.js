import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventService } from "../services/TowerEventService";
import { ticketService } from "../services/TicketService";


export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getTotalEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }


    /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            eventData.creatorId = request.userInfo.id
            const event = await towerEventService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }
    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
    async getAllEvents(request, response, next) {
        try {
            const events = await towerEventService.getAllEvents()
            response.send(events)
        }
        catch (error) {
            next(error)
        }
    }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
   async getEventById(request, response, next){
    try {
        const eventId = request.params.eventId
        const event = await towerEventService.getEventById(eventId)
        response.send(event)
    } catch (error) {
        next(error)
    }
   }

/**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
   async editEvent(request, response, next){
    try {
        const eventId = request.params.eventId
        const eventData = request.body
        const userId = request.userInfo.id
        const event = await towerEventService.editEvent(eventId, eventData, userId)
        response.send(event)
    } catch (error) {
        next(error)
    }
   }

   /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
   async cancelEvent(request, response, next){
    try {
        const eventId = request.params.eventId
        const userId = request.userInfo.id
        const event = await towerEventService.cancelEvent(eventId, userId)
        response.send(event)
    } catch (error) {
        next(error)
    }
   }

    /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
   async getTotalEventTickets(request, response, next){
try {
    const eventId = request.params.eventId
    const tickets = await ticketService.getTotalEventTickets(eventId)
    response.send(tickets)
} catch (error) {
    next(error)
}
   }
}