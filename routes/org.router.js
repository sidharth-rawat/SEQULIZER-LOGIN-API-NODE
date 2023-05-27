const _controller = require('../controllers/org.controller')

const router = require('express').Router()


router.get('/', _controller.getAllOrg)
router.get('/:id', _controller.getOne)
router.post('/',_controller.addOrg)

router.delete('/:id', _controller.deleteOrg)

router.put('/:id', _controller.updateOrg)



module.exports = router
