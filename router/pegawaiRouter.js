const { pegawaiController } = require("../controller")
const express = require('express')
const { readToken } = require("../config")
const router = express.Router()

router.get('/get', readToken, pegawaiController.getPegawai)
router.post('/add', readToken, pegawaiController.addPegawai)
router.post('/login', pegawaiController.login)

module.exports = router