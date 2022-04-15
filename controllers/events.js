import { Profile } from '../models/profile.js'
import { Baby, Event } from '../models/baby.js'

function indexEvents(req, res) {
  Event.find({})
  .populate('createdBy')
  .then(event => {
    if (req.user) {
    baby.find({createdBy: req.user.profile._id})
     .then(babies => {
      res.render('event/', {
        babies,
        events,
        title: "All Events"
      })
    })} else {
      res.render('events/index', {
        events,
        title: "All Feedings"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showEvents(req, res) {
  Event.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(events => {
      baby.find({createdBy: req.user.profile._id})
       .then(babies => {
        res.render('events/all', {
          babies,
          events,
          title: "Events"
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}





  function createEvent(req, res) {
    req.body.createdBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Poop.create(req.body)
      .then(event => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.events.push(event._id)
            profile.save()
            res.redirect('/babies/:id/event')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/event/new')
      })
  }


function deleteEvent(req, res) {
    Poop.findByIdAndDelete(req.params.id)
    .then(event => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.event.pop(event._id)
        profile.save()
        res.redirect('/events')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/events')
      })
    }

function editEvent(req, res) {
  Event.findById(req.params.id)
    .then(event => {
      res.render('event/edit', {
        event,
        title: 'Edit Event'
      })
    })
}

function updateEvent(req, res) {
  req.body.shared = !!req.body.shared
  Poop.findByIdAndUpdate(req.params.id, req.body)
    .then(event => {
      res.redirect('/events/:id')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/events/${req.params.id}/edit`)
    })
}

function newEvent(req, res) {
  res.render('events/new', {title: 'New Event Form'})
}


export {
  indexEvents,
  newEvent,
  editEvent,
  updateEvent
}