import { Request, Response} from 'express'
import {verifyJwt, getTokenFromHeaders} from './jwt'
import { NextFunction } from 'express'

export const checkJwt = (req, res: Response, next: NextFunction) => {
    const {url: path} = req
    const excludedPaths = ['/sign-in']
    const isExcluded = !!excludedPaths.find(p => p.startsWith(path))// o '!!' transforma em boolean
    if(isExcluded) return next()

    const token = getTokenFromHeaders(req.headers);
    if(!token) {
        return res.status(401).json('token not found')
    }
    try{
        const decoded = verifyJwt(token)
        req.userId = decoded.id
        return next()
    }catch(error){
        return res.status(401).json('invalid token')
    }
}