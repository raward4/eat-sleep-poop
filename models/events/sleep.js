import mongoose from "mongoose"


const Schema = mongoose.Schema

const sleepSchema = new Schema({
  amount: {type: Number},
  note: {type: String},
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Sleep = mongoose.model('Sleep', sleepSchema)

export {
  Sleep
}