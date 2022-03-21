import { Twin } from "../models/twin.js";
import { Profile } from "../models/profile.js";
import { Eat } from "../models/eat.js";


function index(req, res) {
  Twin.find({})
  .populate('createdBy')
  .then(twins => {
    res.render('twins/index', {
      twins,
      title: "All twins"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newTwin(req, res) {
  res.render('twins/new', {title: 'New Twin'})
}

function showMytwins(req, res) {
  Twin.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(twins => {
      res.render('twins/show', {
        twins,
        title: 'My twins'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function show(req, res) {
  Twin.findById(req.params.id)
    .populate('createdBy')
    .populate({path: 'eats', populate: {path: 'createdBy'}})  
    .then(Twin => {
      if(req.user) {
      Twin.find({createdBy: req.user.profile._id})
        .then(twins => {
            res.render('twins/show', {
              twins,
              Twin,
              title: "My Twin"
            })
          })
        } else {
            res.render('twins/index', {
            Twin,
            title: "My Twin"
            })
         }
      })
    .catch(err => {
      console.log(err)
      res.redirect('/twins/show')
      })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Twin.create(req.body)
    .then(Twin => {
      Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.twins.push(Twin._id)
          profile.save()
          res.redirect('/twins/show')
          })
        })
    .catch(err => {
    console.log(err)
    res.redirect('/twins/new')
    })
}

function edit(req, res) {
  Twin.findById(req.params.id)
    .then(Twin => {
      res.render('twins/edit', {
        Twin,
        title: 'Edit Twin'
      })
    })
}

function update(req, res) {
  Twin.findByIdAndUpdate(req.params.id, req.body)
    .then(Twin => {
      res.redirect('/twins/mytwins')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/twins/${req.params.id}/edit`)
    })
}

function deleteTwin(req, res) {
  Twin.findByIdAndDelete(req.params.id)
  .then(Twin => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.twins.pop(Twin._id)
      profile.save()
      res.redirect('/twins/mytwins')
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('/twins/mytwins')
    })
  }

  function addEat(req, res) {
    Twin.findById(req.body.TwinId) 
      .then(Twin => {
      Twin.eats.push(req.params.id)
      Twin.save()
      res.redirect(`/twins/${req.body.TwinId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/eats')
        })
   }

   function removeEat(req, res) {
    Twin.findById(req.params.TwinId)
      .then(Twin => {
        Twin.eats.remove({_id: req.params.EatId})
        Twin.save()
        res.redirect(`/twins/${req.params.TwinId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/twins/${req.params.TwinId}`)
      })
   } 

export {
  index,
  newTwin as new,
  showMytwins,
  show,
  create,
  deleteTwin as delete,
  edit,
  update,
  addEat,
  removeEat
}


