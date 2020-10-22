const jwt = require('jsonwebtoken')

const tokenPrivateKey = 'TY968@#_49VGJwKk21!$5&*=}>,/oIs*665542Içç'
const refreshTokenPrivateKey = 'fjfjd949t9gkeowc+22#ww1@cv_-77E3'

const options = { expiresIn: '30 hours'}
const refreshOptions = { expiresIn: '30 days'}

export const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, options)
}
export const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions)
}
export const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey)
}
export const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey)
}
export const getTokenFromHeaders = (headers) => {
    const token = headers['authorization'];
    return token ? token.slice(7, token.length) : null
}

