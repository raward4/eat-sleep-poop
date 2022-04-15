import { Profile } from '../models/profile.js'
import { Baby, Event } from '../models/baby.js'

function indexBabies(req, res) {
  Baby.find({})
  .populate('createdBy')
  .then(babies => {
    res.render('/babies', {
      babies,
      title: "All babies"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newBaby(req, res) {
  res.render('babies/new', {title: 'New Baby'})
}

function showBaby(req, res) {
  Baby.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(babies => {
      res.render('babies/:id', {
        babies,
        title: 'Baby Details'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function showBabyDetails(req, res) {
  Baby.findById(req.params.id)
    .populate('createdBy')
    .populate({path: 'events', populate: {path: 'createdBy'}})  
    .then(baby => {
      if(req.user) {
      Baby.find({createdBy: req.user.profile._id})
        .then(babies => {3
            res.render('babies/:id', {
              babies,
              baby,
              title: "My Baby"
            })
          })
        } else {
            res.render('babies/:id', {
            baby,
            title: "Baby Details"
            })
         }
      })
    .catch(err => {
      console.log(err)
      res.redirect('babies/')
      })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Baby.create(req.body)
    .then(baby => {
      Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.babies.push(baby._id)
          profile.save()
          res.redirect('/babies')
          })
        })
    .catch(err => {
    console.log(err)
    res.redirect('babies/new')
    })
}

function edit(req, res) {
  Baby.findById(req.params.id)
    .then(baby => {
      res.render('babies/edit', {
        baby,
        title: 'Edit Baby'
      })
    })
}

function update(req, res) {
  Baby.findByIdAndUpdate(req.params.id, req.body)
    .then(baby => {
      res.redirect('babies/:id')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`babies/${req.params.id}/edit`)
    })
}

function deleteBaby(req, res) {
  Baby.findByIdAndDelete(req.params.id)
  .then(baby => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.babies.pop(baby._id)
      profile.save()
      res.redirect('babies/:id')
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('babies/')
    })
  }

  function createEvent(req, res) {
    Baby.findById(req.body.babyId) 
      .then(baby => {
      baby.events.push(req.params.id)
      baby.save()
      res.redirect(`babies/${req.body.babyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/babies/:id/event')
        })
   }

   function deleteEvent(req, res) {
    Baby.findById(req.params.babyId)
      .then(baby => {
        baby.event.remove({_id: req.params.eatId})
        baby.save()
        res.redirect(`babies/${req.params.babyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`babies/${req.params.babyId}`)
      })
   } 

export {
  indexBabies,
  newBaby as new,
  showBaby,
  showBabyDetails,
  createBaby,
  deleteBaby,
  editBaby,
  updateBaby,
  createEvent,
  deleteEvent
}


