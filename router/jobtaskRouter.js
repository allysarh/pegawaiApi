const express = require('express')
const { readToken } = require('../config')
const router = express.Router()
const { jobtaskController } = require('../controller')

router.get('/get', jobtaskController.getJobtask)
router.post('/add', readToken, jobtaskController.addJobtask)
router.delete('/delete/:idjob_task', readToken, jobtaskController.deleteJobtask)
router.patch('/update/:idjob_task', readToken, jobtaskController.updateJobtask)
module.exports = router

