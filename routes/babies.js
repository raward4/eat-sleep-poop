import { Router } from "express";
import * as babiesCtrl from '../controllers/babies.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()

router.get('/', babiesCtrl.index)

router.get('/new', isLoggedIn,  babiesCtrl.new)

router.get('/:id', babiesCtrl.showBabies)

router.get('/:id/edit',isLoggedIn, babiesCtrl.editBaby)

router.post('/babies',isLoggedIn, babiesCtrl.createBaby)

router.put('/:id',isLoggedIn, babiesCtrl.updateBaby)

router.delete('/:id',isLoggedIn, babiesCtrl.deleteBaby)

router.post('/:id',isLoggedIn, babiesCtrl.addBaby)

router.post('/:id/event',isLoggedIn, babiesCtrl.createEvent)

router.get('/events/:id/edit',isLoggedIn, babiesCtrl.editEvent)

router.put('/events/:id',isLoggedIn, babiesCtrl.updateEvent)

router.delete('/events:id',isLoggedIn, babiesCtrl.deleteEvent)

router.post('/events/:id',isLoggedIn, babiesCtrl.addEvent)

export {
  router
}