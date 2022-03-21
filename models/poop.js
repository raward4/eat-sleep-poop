import mongoose from "mongoose"


const Schema = mongoose.Schema

const poopSchema = new Schema({
  date: {type: Date},
  type: {type: String, enum: ['Wet', 'Dirty'], defult: 'Wet'},
  note: {type: String},
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Poop = mongoose.model('Poop', poopSchema)

export {
  Poop
}