const _controller = require('../controllers/user.Controller.js')

const router = require('express').Router()


router.get('/', _controller.getAllUser)
router.get('/:id', _controller.getOne)

router.delete('/:id', _controller.deleteUser)

router.put('/:id', _controller.updateUser)

router.post('/',_controller.addUser)
router.post('/login',_controller.login)


module.exports = router
