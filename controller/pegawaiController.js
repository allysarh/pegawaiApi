const { db, dbQuery, createToken } = require('../config')

module.exports = {
    getPegawai: async (req, res, next) => {
        try {
            console.log("user", req.user)
            let pegawai = ""
            if (req.user.role === "Super Admin") {
                pegawai = `SELECT idpegawai, fullname, email, posisi, role, status from biodata_pegawai b 
                JOIN status s on s.idstatus = b.idstatus
                JOIN posisi p on p.idposisi = b.idposisi
                JOIN role r on r.idrole = p.idrole
                where b.idstatus = 1;`
                let query = []
                if (Object.keys(req.query).length > 0) {
                    for (prop in req.query) {
                        query.push(`${prop} = ${db.escape(req.query[prop])}`)
                    }

                    pegawai = `SELECT idpegawai, fullname, email, posisi, role, status from biodata_pegawai b 
                    JOIN status s on s.idstatus = b.idstatus
                    JOIN posisi p on p.idposisi = b.idposisi
                    JOIN role r on r.idrole = p.idrole
                    where b.idstatus = 1
                    
                    and ${query.join(" and ")};`

                    console.log(pegawai)
                }
            } else if (req.user.role === "Guest") {
                pegawai = `SELECT idpegawai, fullname, email, posisi, role, telepon, status from biodata_pegawai b 
                JOIN status s on s.idstatus = b.idstatus
                JOIN posisi p on p.idposisi = b.idposisi
                JOIN role r on r.idrole = p.idrole
                where b.idstatus = 1 and parentId = ${req.user.parentId};`

            } else if (req.user.role === "Admin") {
                pegawai = `WITH RECURSIVE posisi_path (idposisi, posisi, path) AS
                (
                    SELECT idposisi, posisi, posisi as path
                        FROM posisi
                        WHERE posisi = ${db.escape(req.user.posisi)}
                    UNION ALL
                    SELECT p.idposisi, p.posisi, CONCAT(pp.path, ' > ', p.posisi)
                        FROM posisi_path AS pp JOIN posisi AS p
                        ON pp.idposisi = p.parentId
                )
                SELECT idpegawai, b.idposisi, fullName, email, telepon, posisi FROM posisi_path pp  
                JOIN biodata_pegawai b where b.idposisi = pp.idposisi
                ORDER BY path;`
            }

            pegawai = await dbQuery(pegawai)
            console.log("pegawai", pegawai)

            let getJobtask = `SELECT * from job_task;`
            getJobtask = await dbQuery(getJobtask)
            console.log("getJobtask", getJobtask)
            pegawai.forEach(element => {
                element.jobtask = []
                getJobtask.forEach(item =>{
                    if(item.idpegawai === element.idpegawai){
                        element.jobtask.push(item)
                    }
                })
            });

            res.status(200).send(pegawai)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
    addPegawai: async (req, res, next) => {
        try {
            console.log("hasil token", req.user)
            let { fullName, email, password, idrole, idstatus } = req.body
            let add = `INSERT into biodata_pegawai (fullName, email, password, idposisi, idstatus) values (${db.escape(fullName)}, ${db.escape(email)}, ${db.escape(password)},${db.escape(idrole)}, ${db.escape(idstatus)})`
            if (req.user.role === "Super Admin") {
                add = await dbQuery(add)
                res.status(200).send({ status: "OK", message: "Berhasil add pegawai baru" })
            } else {
                res.status(401).send("Anda tidak bisa menambahkan data. Hubungi super admin")
            }
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            console.log("request body", req.body)
            let { email, password } = req.body

            let login = `SELECT idpegawai, fullname, email, posisi, role, p.parentId, status from biodata_pegawai b 
            JOIN status s on s.idstatus = b.idstatus
            JOIN posisi p on p.idposisi = b.idposisi
            JOIN role r on r.idrole = p.idrole where email = ${db.escape(email)} and password = ${db.escape(password)};`
            console.log("login", login)
            login = await dbQuery(login)
            console.log("login", login)

            let { idpegawai, fullName, role, posisi, status, parentId } = login[0]

            let token = createToken({ idpegawai, fullName, email, posisi, role, status, parentId })

            res.status(200).send({ idpegawai, fullName, email, posisi, role, status, parentId, token })
        } catch (error) {
            next(error)
        }
    },
    deletePegawai: async (req, res, next) => {
        try {
            console.log(req.user)
            if (req.user.role === "Super Admin") {
                let deletePegawai = `UPDATE biodata_pegawai set idstatus = 2 where idpegawai = ${req.params.idpegawai};`
                deletePegawai = await dbQuery(deletePegawai)
                res.status(200).send({ status: "Berhasil delete", message: deletePegawai })
            } else {
                res.status(401).send("Anda tidak bisa menambahkan data. Hubungi super admin")
            }
        } catch (error) {
            next(error)
        }
    },
    updatePegawai: async (req, res, next) => {
        try {
            if (req.user.role === "Super Admin") {
                let updatePegawai = []
                for (prop in req.body) {
                    updatePegawai.push(`Update biodata_pegawai set ${prop} = ${db.escape(req.body[prop])} where idpegawai = ${req.params.idpegawai};`)
                }
                console.log(updatePegawai.join(""))
                updatePegawai = await dbQuery(updatePegawai.join(""))
                res.status(200).send({ status: 'Berhasil', message: updatePegawai })
            } else {
                res.status(401).send("Anda tidak bisa menambahkan data. Hubungi super admin")
            }
        } catch (error) {
            next(error)
        }
    }
}