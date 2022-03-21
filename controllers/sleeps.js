import { Sleep } from "../models/Sleep.js"
import { Profile } from '../models/profile.js'
import { twin } from '../models/twin.js'


function index(req, res) {
  Sleep.find({})
  .populate('crSleepedBy')
  .then(sleeps => {
    if (req.user) {
    twin.find({crSleepedBy: req.user.profile._id})
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


function showMysleeps(req, res) {
  Sleep.find({crSleepedBy: req.user.profile._id})
    .populate('crSleepedBy')
    .then(sleeps => {
      twin.find({crSleepedBy: req.user.profile._id})
       .then(twins => {
        res.render('sleeps/show', {
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


  function crSleepe(req, res) {
    req.body.crSleepedBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Sleep.crSleepe(req.body)
      .then(Sleep => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.sleeps.push(Sleep._id)
            profile.save()
            res.redirect('/sleeps/show')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/sleeps/new')
      })
  }


function deleteSleep(req, res) {
    Sleep.findByIdAndDelete(req.params.id)
    .then(Sleep => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.sleeps.pop(Sleep._id)
        profile.save()
        res.redirect('/sleeps/show')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/sleeps/show')
      })
    }

function edit(req, res) {
  Sleep.findById(req.params.id)
    .then(Sleep => {
      res.render('sleeps/edit', {
        Sleep,
        title: 'Edit Nap'
      })
    })
}

function update(req, res) {
  req.body.shared = !!req.body.shared
  Sleep.findByIdAndUpdate(req.params.id, req.body)
    .then(Sleep => {
      res.redirect('/sleeps/show')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/sleeps/${req.params.id}/edit`)
    })
}

export {
  index,
  newSleep as new,
  crSleepe,
  showMysleeps,
  deleteSleep as delete,
  edit,
  update
}