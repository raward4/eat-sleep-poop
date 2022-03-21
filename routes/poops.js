import { Router } from "express"
import * as poopsCtrl from '../controllers/poops.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', poopsCtrl.index)

router.get('/new',isLoggedIn, poopsCtrl.new)

router.get('/:id/edit',isLoggedIn, poopsCtrl.edit)

router.get('/mypoops',isLoggedIn, poopsCtrl.showMyPoops)

router.post('/mypoops',isLoggedIn, poopsCtrl.create)

router.put('/:id',isLoggedIn, poopsCtrl.update)

router.delete('/:id',isLoggedIn, poopsCtrl.delete)

export {
  router
}
