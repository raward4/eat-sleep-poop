import mongoose from "mongoose"


const Schema = mongoose.Schema

const poopSchema = new Schema({
  type: {type: Select, enum: ['Wet', 'Dirty'], defult: 'Wet'},
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Poop = mongoose.model('Poop', poopSchema)

export {
  Poop
}