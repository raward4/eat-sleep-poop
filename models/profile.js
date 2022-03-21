import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  eats: [{type: Schema.Types.ObjectId, ref: "Eat"}],
  twins: [{type: Schema.Types.ObjectId, ref: "Twin"}],
  poops: [{type: Schema.Types.ObjectId, ref: "Poop"}],
  sleeps: [{type: Schema.Types.ObjectId, ref: "Sleep"}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
