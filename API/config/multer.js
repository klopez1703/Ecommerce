const uuid=require('uuid').v4
const path=require('path')
const multer= require('multer')
const diskStorahge=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./imagenes')
    },
    filename(req,file,cb){
        cb(null,`${uuid()}${path.extname(file.originalname)}`)
    }
})
exports.upload=multer({storage:diskStorahge})