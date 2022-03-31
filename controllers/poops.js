import { Sleep } from "../models/sleep.js"
import { Profile } from '../models/profile.js'
import { Twin } from '../models/twin.js'
import { Poop } from "../models/poop.js"
import { Eat } from "../models/eat.js"

function index(req, res) {
  Poop.find({})
  .populate('createdBy')
  .then(poops => {
    if (req.user) {
    twin.find({createdBy: req.user.profile._id})
     .then(twins => {
      res.render('poops/index', {
        twins,
        poops,
        title: "All Feedings"
      })
    })} else {
      res.render('poops/index', {
        poops,
        title: "All Feedings"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showMyPoops(req, res) {
  Poop.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(poops => {
      twin.find({createdBy: req.user.profile._id})
       .then(twins => {
        res.render('poops/mypoops', {
          twins,
          poops,
          title: "Feedings"
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function newpoop(req, res) {
  res.render('poops/new', {title: 'New Feeding'})
}


  function create(req, res) {
    req.body.createdBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Poop.create(req.body)
      .then(poop => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.poops.push(poop._id)
            profile.save()
            res.redirect('/poops/mypoops')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/poops/new')
      })
  }


function deletepoop(req, res) {
    Poop.findByIdAndDelete(req.params.id)
    .then(poop => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.poops.pop(poop._id)
        profile.save()
        res.redirect('/poops/mypoops')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/poops/mypoops')
      })
    }

function edit(req, res) {
  Poop.findById(req.params.id)
    .then(poop => {
      res.render('poops/edit', {
        poop,
        title: 'Edit Feeding'
      })
    })
}

function update(req, res) {
  req.body.shared = !!req.body.shared
  Poop.findByIdAndUpdate(req.params.id, req.body)
    .then(poop => {
      res.redirect('/poops/mypoops')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/poops/${req.params.id}/edit`)
    })
}

export {
  index,
  newpoop as new,
  create,
  showMyPoops,
  deletepoop as delete,
  edit,
  update
}