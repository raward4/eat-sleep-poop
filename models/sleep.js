import mongoose from "mongoose"


const Schema = mongoose.Schema

const sleepSchema = new Schema({
  date: {type: Date},
  amount: {type: Number},
  note: String,
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Sleep = mongoose.model('Sleep', sleepSchema)

export {
  Sleep
}