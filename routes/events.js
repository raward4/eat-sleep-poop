import { Router } from "express"
import * as eventsCtrl from '../controllers/events.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', eventsCtrl.index)

router.get('/new',isLoggedIn, eventsCtrl.new)

router.get('/:id/edit',isLoggedIn, eventsCtrl.edit)

router.get('/babies/:id/event',isLoggedIn, eventsCtrl.showMyEats)

router.post('/myevents',isLoggedIn, eventsCtrl.create)

router.put('/:id',isLoggedIn, eventsCtrl.update)

router.delete('/:id',isLoggedIn, eventsCtrl.delete)

export {
  router
}