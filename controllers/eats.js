import { Sleep } from "../models/Sleep.js"
import { Profile } from '../models/profile.js'
import { Twin } from '../models/twin.js'
import { Poop } from "../models/poop.js";
import { Eat } from "../models/eat.js";

function index(req, res) {
  Eat.find({})
  .populate('createdBy')
  .then(eats => {
    if (req.user) {
    twin.find({createdBy: req.user.profile._id})
     .then(twins => {
      res.render('eats/index', {
        twins,
        eats,
        title: "All Feedings"
      })
    })} else {
      res.render('eats/index', {
        eats,
        title: "All Feedings"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showMyEats(req, res) {
  Eat.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(eats => {
      Twin.find({createdBy: req.user.profile._id})
       .then(twins => {
        res.render('eats/myeats', {
          twins,
          eats,
          title: "Feedings"
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function newEat(req, res) {
  res.render('eats/new', {title: 'New Feeding'})
}


  function create(req, res) {
    req.body.createdBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Eat.create(req.body)
      .then(eat => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.eats.push(eat._id)
            profile.save()
            res.redirect('/eats/myeats')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/eats/new')
      })
  }


function deleteEat(req, res) {
    Eat.findByIdAndDelete(req.params.id)
    .then(eat => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.eats.pop(eat._id)
        profile.save()
        res.redirect('/eats/myeats')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/eats/myeats')
      })
    }

function edit(req, res) {
  Eat.findById(req.params.id)
    .then(eat => {
      res.render('eats/edit', {
        eat,
        title: 'Edit Feeding'
      })
    })
}

function update(req, res) {
  req.body.shared = !!req.body.shared
  Eat.findByIdAndUpdate(req.params.id, req.body)
    .then(eat => {
      res.redirect('/eats/myeats')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/eats/${req.params.id}/edit`)
    })
}

export {
  index,
  newEat as new,
  create,
  showMyEats,
  deleteEat as delete,
  edit,
  update
}