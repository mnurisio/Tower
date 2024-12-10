import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"


class TowerEventService{

 async getEvents() {
    const response = await api.get('api/events')
    logger.log('got events', response.data)
    const events = response.data.map(eventPOJO => new TowerEvent(eventPOJO))
    AppState.towerEvents = events
  }

}

export const towerEventService = new TowerEventService()