import mongoose from "mongoose"


const Schema = mongoose.Schema

const eatSchema = new Schema({
  date: {type: Date},
  type: {type: String, enum: ['Bottle', 'Breast'], defult: 'Bottle'},
  amount: {type: Number},
  note: {type: String},
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Eat = mongoose.model('Eat', eatSchema)

export {
  Eat
}