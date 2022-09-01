const router = require('express').Router()
const userCtrl = require('../controller/userCtrl')



router.post("/register",userCtrl.register)
router.post("/login",userCtrl.login)
router.post("/home",userCtrl.home)
router.get('/getalldata/:email', userCtrl.getalldata)
router.delete('/deletedata/:_id', userCtrl.deletedata)
router.patch('/editdata/:_id', userCtrl.editdata)


module.exports = router