const {db, dbQuery, createToken} = require('../config')

module.exports = {
    getPegawai: async (req, res, next) =>{
        try {
            let pegawai = `SELECT idpegawai, fullname, email, password, role, status from biodata_pegawai b 
            JOIN status s on s.idstatus = b.idstatus
            JOIN role r on r.idrole = b.idrole;`
            console.log("pegawai", pegawai)

            pegawai = await dbQuery(pegawai)

            res.status(200).send(pegawai)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
    addPegawai: async (req, res, next) =>{
        try {
            console.log("hasil token", req.user)
            let {fullName, email, password, idrole, idstatus} = req.body
            let add = `INSERT into biodata_pegawai (fullName, email, password, idrole, idstatus) values (${db.escape(fullName)}, ${db.escape(email)}, ${db.escape(password)},${db.escape(idrole)}, ${db.escape(idstatus)})`
            if(req.user.role === "Super Admin"){
                add = await dbQuery(add)
                res.status(200).send({status: "OK", message: "Berhasil add pegawai baru"})
            } else {
                res.status(401).send("Anda tidak bisa menambahkan data. Hubungi super admin")
            }
        } catch (error) {
            next(error)
        }
    },
    login : async (req, res, next) =>{
        try {
            console.log("request body", req.body)
            let {email, password} = req.body

            let login = `SELECT idpegawai, fullname, email, password, role, status from biodata_pegawai b 
            JOIN status s on s.idstatus = b.idstatus
            JOIN role r on r.idrole = b.idrole where email = ${db.escape(email)} and password = ${db.escape(password)};`
            login = await dbQuery(login)
            console.log("login", login)
            let {idpegawai, fullName, role, status} = login[0]

            let token = createToken({idpegawai, fullName, role, status})
            
            res.status(200).send({fullName, role, status, token})
        } catch (error) {
            next(error)
        }
    },
    addJob: async (req, res) =>{
        try {
            
        } catch (error) {
            next(error)
        }
    }, 
    getJob: async ( req, res) =>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}