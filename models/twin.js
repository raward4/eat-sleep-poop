import mongoose from 'mongoose'


const Schema = mongoose.Schema


const commentsSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const twinSchema = new Schema({
  name: {type: String, required: true},
  imgUrl: String,
  eats: [{type: Schema.Types.ObjectId, ref: 'Eat'}],
  sleeps:[{type: Schema.Types.ObjectId, ref: 'Sleep'}],
  poops:[{type: Schema.Types.ObjectId, ref: 'Poop'}],
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'},
  comments: [commentsSchema],
}, {
  timestamps: true
})

const Twin = mongoose.model('Twin', twinSchema)

export {
  Twin
}