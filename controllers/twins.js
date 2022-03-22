import { Profile } from '../models/profile.js'
import { Twin } from '../models/twin.js'



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

function showMyTwins(req, res) {
  Twin.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(twins => {
      res.render('twins/mytwins', {
        twins,
        title: 'My Twins'
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
    .then(twin => {
      if(req.user) {
      Twin.find({createdBy: req.user.profile._id})
        .then(twins => {
            res.render('twins/show', {
              twins,
              twin,
              title: "My Twin"
            })
          })
        } else {
            res.render('twins/show', {
            twin,
            title: "My Twin"
            })
         }
      })
    .catch(err => {
      console.log(err)
      res.redirect('twins/mytwins')
      })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Twin.create(req.body)
    .then(twin => {
      Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.twins.push(twin._id)
          profile.save()
          res.redirect('twins/mytwins')
          })
        })
    .catch(err => {
    console.log(err)
    res.redirect('twins/new')
    })
}

function edit(req, res) {
  Twin.findById(req.params.id)
    .then(twin => {
      res.render('twins/edit', {
        twin,
        title: 'Edit Twin'
      })
    })
}

function update(req, res) {
  Twin.findByIdAndUpdate(req.params.id, req.body)
    .then(twin => {
      res.redirect('twins/mytwins')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`twins/${req.params.id}/edit`)
    })
}

function deleteTwin(req, res) {
  Twin.findByIdAndDelete(req.params.id)
  .then(twin => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.twins.pop(twin._id)
      profile.save()
      res.redirect('twins/mytwins')
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('twins/mytwins')
    })
  }

  function addEat(req, res) {
    Twin.findById(req.body.twinId) 
      .then(twin => {
      twin.eats.push(req.params.id)
      twin.save()
      res.redirect(`twins/${req.body.twinId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/eats')
        })
   }

   function removeEat(req, res) {
    Twin.findById(req.params.twinId)
      .then(twin => {
        twin.eats.remove({_id: req.params.eatId})
        twin.save()
        res.redirect(`twins/${req.params.twinId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`twins/${req.params.twinId}`)
      })
   } 

export {
  index,
  newTwin as new,
  showMyTwins,
  show,
  create,
  deleteTwin as delete,
  edit,
  update,
  addEat,
  removeEat
}


