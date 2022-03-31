import { Sleep } from "../models/sleep.js"
import { Profile } from '../models/profile.js'
import { Twin } from '../models/twin.js'
import { Poop } from "../models/poop.js";
import { Eat } from "../models/eat.js";


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