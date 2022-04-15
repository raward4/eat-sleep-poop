import mongoose from 'mongoose'
import eatSchema from './models/eat'
import poopSchema from './models/poop'
import sleepSchema from './models/sleep'

const Schema = mongoose.Schema

const babySchema = new Schema({
  name: {type: String},
  imgUrl: {type: String},
  event: [eventSchema],

  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'},
}, {
  timestamps: true
})

const eventSchema = new Schema({
  date: {type: Date},
  eat: [eatSchema],
  poop: [poopSchema],
  sleep: [sleepSchema],
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Baby = mongoose.model('Baby', babySchema)
const Event = mongoose.model('Event', eventSchema)

export {
  Baby,
  Event
}