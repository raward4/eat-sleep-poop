import { Sleep } from "../models/sleep.js"
import { Profile } from '../models/profile.js'
import { Baby } from '../models/baby.js'
import { Poop } from "../models/events/poop.js";
import { Eat } from "../models/events/eat.js";


function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  show
}