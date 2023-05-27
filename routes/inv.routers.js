const _controller = require('../controllers/inven.controller')

const router = require('express').Router()


router.get('/', _controller.getAllInv)
router.get('/:id', _controller.getOne)
router.post('/',_controller.addInv)

router.delete('/:id', _controller.deleteInv)

router.put('/:id', _controller.updateInv)
router.get('/re/:id',_controller.get)


module.exports = router
