import { Profile } from '../models/profile.js'
import { Baby } from '../models/baby.js'



function index(req, res) {
  Baby.find({})
  .populate('createdBy')
  .then(babies => {
    res.render('babies/index', {
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

function showMyBabies(req, res) {
  Baby.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(babies => {
      res.render('babies/babies', {
        babies,
        title: 'My Babies'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function show(req, res) {
  Baby.findById(req.params.id)
    .populate('createdBy')
    .populate({path: 'eats', populate: {path: 'createdBy'}})  
    .then(baby => {
      if(req.user) {
      Baby.find({createdBy: req.user.profile._id})
        .then(babies => {
            res.render('babies/show', {
              babies,
              baby,
              title: "My Baby"
            })
          })
        } else {
            res.render('babies/show', {
            baby,
            title: "My Baby"
            })
         }
      })
    .catch(err => {
      console.log(err)
      res.redirect('babies/babies')
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
          res.redirect('babies/babies')
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
      res.redirect('babies/babies')
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
      res.redirect('babies/babies')
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('babies/babies')
    })
  }

  function addEat(req, res) {
    Baby.findById(req.body.babyId) 
      .then(baby => {
      baby.eats.push(req.params.id)
      baby.save()
      res.redirect(`babies/${req.body.babyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/eats')
        })
   }

   function removeEat(req, res) {
    Baby.findById(req.params.babyId)
      .then(baby => {
        baby.eats.remove({_id: req.params.eatId})
        baby.save()
        res.redirect(`babies/${req.params.babyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`babies/${req.params.babyId}`)
      })
   } 

export {
  index,
  newBaby as new,
  showMyBabies,
  show,
  create,
  deleteBaby as delete,
  edit,
  update,
  addEat,
  removeEat
}


