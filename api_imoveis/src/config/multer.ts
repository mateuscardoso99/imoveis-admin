import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
    storage: multer.diskStorage({
        destination(req, file, callback){
            if(file.fieldname == 'imageCorretor'){
                callback(null, path.resolve(__dirname,'..','..','uploads','corretores'))
            }else if(file.fieldname == 'imageImovel'){
                callback(null, path.resolve(__dirname,'..','..','uploads','imoveis'))
            }
        },
        filename(req, file, callback){
            const hash = crypto.randomBytes(6).toString('hex')
            const fileName = `${hash}-${file.originalname}`
            callback(null,fileName)
        }
    })
}