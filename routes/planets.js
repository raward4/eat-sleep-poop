import { Router } from "express"
import * as eatsCtrl from '../controllers/eats.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', eatsCtrl.index)

router.get('/new',isLoggedIn, eatsCtrl.new)

router.get('/:id/edit',isLoggedIn, eatsCtrl.edit)

router.get('/myeats',isLoggedIn, eatsCtrl.showMyeats)

router.post('/myeats',isLoggedIn, eatsCtrl.create)

router.put('/:id',isLoggedIn, eatsCtrl.update)

router.delete('/:id',isLoggedIn, eatsCtrl.delete)

export {
  router
}