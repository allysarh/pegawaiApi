const { pegawaiController } = require("../controller")
const express = require('express')
const { readToken } = require("../config")
const router = express.Router()

router.get('/get', pegawaiController.getPegawai)
router.post('/add', readToken, pegawaiController.addPegawai)
router.post('/login', pegawaiController.login)
router.delete('/delete/:idpegawai', readToken, pegawaiController.deletePegawai)
router.patch('/update/:idpegawai', readToken, pegawaiController.updatePegawai)

module.exports = router