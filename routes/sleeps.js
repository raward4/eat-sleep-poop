import { Router } from "express"
import * as sleepsCtrl from '../controllers/sleeps.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', sleepsCtrl.index)

router.get('/new',isLoggedIn, sleepsCtrl.new)

router.get('/:id/edit',isLoggedIn, sleepsCtrl.edit)

router.get('/mysleeps',isLoggedIn, sleepsCtrl.showMySleeps)

router.post('/mysleeps',isLoggedIn, sleepsCtrl.create)

router.put('/:id',isLoggedIn, sleepsCtrl.update)

router.delete('/:id',isLoggedIn, sleepsCtrl.delete)

export {
  router
}