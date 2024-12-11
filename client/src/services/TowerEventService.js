import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"


class TowerEventService {

  async getEvents() {
    const response = await api.get('api/events')
    logger.log('got events', response.data)
    const events = response.data.map(eventPOJO => new TowerEvent(eventPOJO))
    AppState.towerEvents = events
  }

  async getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    logger.log('getting event by ID', response.data)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
  }

  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('cancelling event', response.data)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
  }

 async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log('created event', response.data)
    const event = new TowerEvent(response.data)
    AppState.towerEvents.unshift(event)
    return event

}

}

export const towerEventService = new TowerEventService()