import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  eats: [{type: Schema.Types.ObjectId, ref: "Eat"}],
  twins: [{type: Schema.Types.ObjectId, ref: "twin"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
