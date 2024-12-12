import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from '../models/TowerEvent';
import { TicketSchema } from '../models/Tickets';
import { CommentSchema } from '../models/Comments';

class DbContext {

  Account = mongoose.model('Account', AccountSchema);
  TowerEvent = mongoose.model('TowerEvent', TowerEventSchema);
  Ticket = mongoose.model('Ticket', TicketSchema);
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
