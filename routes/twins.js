import { Router } from "express";
import * as twinsCtrl from '../controllers/twins.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()

router.get('/', twinsCtrl.index)

router.get('/mytwins',isLoggedIn, twinsCtrl.showMytwins)

router.get('/new', isLoggedIn,  twinsCtrl.new)

router.get('/:id', twinsCtrl.show)

router.get('/:id/edit',isLoggedIn, twinsCtrl.edit)

router.post('/mytwins',isLoggedIn, twinsCtrl.create)

router.post('/:id/eats',isLoggedIn, twinsCtrl.addEat)

router.put('/:id',isLoggedIn, twinsCtrl.update)

router.delete('/:id',isLoggedIn, twinsCtrl.delete)

router.delete('/:twinId/eats/:EatId',isLoggedIn, twinsCtrl.removeEat)

export {
  router
}