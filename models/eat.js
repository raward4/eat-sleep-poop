import mongoose from "mongoose"


const Schema = mongoose.Schema

const eatSchema = new Schema({
  date: {type: Date},
  name: {type: String},
  meal: {type: select, enum: ['Bottle', 'Breast'], defult: 'Bottle'},
  amount: {type: number},
}, {
  timestamps: true
  },
)

const Eat = mongoose.model('Eat', eatSchema)

export {
  Eat
}