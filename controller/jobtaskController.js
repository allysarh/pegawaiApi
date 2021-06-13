const { db, dbQuery } = require('../config')

module.exports = {
    getJobtask: async (req, res, next) => {
        try {
            let get = "SELECT idjob_task, fullName, jt.idpegawai, jobtask, deadline from job_task jt join biodata_pegawai b where jt.idpegawai = b.idpegawai;"
            let query = []
            console.log("length", Object.keys(req.query).length)
            if (Object.keys(req.query).length > 0) {
                console.log(req.query)
                for (prop in req.query) {
                    query.push(`b.${prop} = ${db.escape(req.query[prop])}`)
                }
                get = `select idjob_task, fullName, jt.idpegawai, jobtask, deadline from job_task jt join biodata_pegawai b where jt.idpegawai = b.idpegawai and ${query.join(' and ')};`
            } 
            console.log(get)
            get = await dbQuery(get)
            res.status(200).send(get)

        } catch (error) {
            next(error)
        }
    },
    addJobtask: async (req, res, next) => {
        try {
            console.log(req.user.role)
            let { idpegawai, jobtask, deadline } = req.body
            if (req.user.role == 'Super Admin' || req.user.role === 'Admin') {
                let add = `INSERT into job_task (idpegawai, jobtask, deadline) values (${db.escape(idpegawai)}, ${db.escape(jobtask)}, ${db.escape(deadline)});`
                add = await dbQuery(add)

                res.status(200).send("Berhasil menambahkan job task")
            }
            res.status(401).send("User not authorized")
        } catch (error) {
            next(error)
        }
    },
    deleteJobtask: async (req, res, next) => {
        try {
            if (req.user.role === "Super Admin" || req.user.role === "Admin") {
                let deleteJobtask = `DELETE from job_task where idjob_task = ${req.params.idjob_task}`
                deleteJobtask = await dbQuery(deleteJobtask)

                res.status(200).send({ status: 'Berhasil delete jobtask', message: deleteJobtask })
            } else {
                res.status(401).send("User not authorized")
            }
        } catch (error) {
            next(error)
        }
    },
    updateJobtask: async (req, res, next) => {
        try {
            if (req.user.role === "Super Admin" || req.user.role === "Admin") {
                let updateJobtask = []
                for (prop in req.body) {
                    updateJobtask.push(`UPDATE job_task set ${prop} = ${db.escape(req.body[prop])} where idjob_task = ${req.params.idjob_task};`)
                }
                updateJobtask = await dbQuery(updateJobtask.join(""))
                res.status(200).send({ status: 'Berhasil update jobtask', message: updateJobtask })
            } else {
                res.status(401).send("User not authorized")
            }
        } catch (error) {
            next(error)
        }
    }
}