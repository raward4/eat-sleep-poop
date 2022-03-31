import { Sleep } from "../models/sleep.js"
import { Profile } from '../models/profile.js'
import { Twin } from '../models/twin.js'
import { Poop } from "../models/poop.js";
import { Eat } from "../models/eat.js";



function index(req, res) {
  Sleep.find({})
  .populate('createdBy')
  .then(sleeps => {
    if (req.user) {
    twin.find({createdBy: req.user.profile._id})
     .then(twins => {
      res.render('sleeps/index', {
        twins,
        sleeps,
        title: "All Feedings"
      })
    })} else {
      res.render('sleeps/index', {
        sleeps,
        title: "All Feedings"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showMySleeps(req, res) {
  Sleep.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(sleeps => {
      twin.find({createdBy: req.user.profile._id})
       .then(twins => {
        res.render('sleeps/mysleeps', {
          twins,
          sleeps,
          title: "Feedings"
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function newSleep(req, res) {
  res.render('sleeps/new', {title: 'New Feeding'})
}


  function create(req, res) {
    req.body.createdBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Sleep.create(req.body)
      .then(sleep => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.sleeps.push(sleep._id)
            profile.save()
            res.redirect('/sleeps/mysleeps')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/sleeps/new')
      })
  }


function deleteSleep(req, res) {
    Sleep.findByIdAndDelete(req.params.id)
    .then(sleep => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.sleeps.pop(Sleep._id)
        profile.save()
        res.redirect('/sleeps/mysleeps')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/sleeps/mysleeps')
      })
    }

function edit(req, res) {
  Sleep.findById(req.params.id)
    .then(sleep => {
      res.render('sleeps/edit', {
        Sleep,
        title: 'Edit Nap'
      })
    })
}

function update(req, res) {
  req.body.shared = !!req.body.shared
  Sleep.findByIdAndUpdate(req.params.id, req.body)
    .then(sleep => {
      res.redirect('/sleeps/mysleeps')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/sleeps/${req.params.id}/edit`)
    })
}

export {
  index,
  newSleep as new,
  create,
  showMySleeps,
  deleteSleep as delete,
  edit,
  update
}