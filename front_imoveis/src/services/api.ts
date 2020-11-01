import axios from 'axios'
import {getToken, getRefreshToken} from '../storage/account'

export const getApiUrl = (path:string) => {
    return `http://10.0.0.5:3333${path}`
}

export const getHeaders = () => {
    const token = getToken()
    if(!token) return {}
    return {
        Authorization: `Bearer ${token}`
    }
}

export const apiPost = (path:string, data = {}) => {
    const url = getApiUrl(path)
    const options = {
        headers: getHeaders()
    }
    return axios.post(url, data, options)
}

export const apiPut = (path:string, data = {}) => {
    const url = getApiUrl(path)
    const options = {
        headers: getHeaders()
    }
    return axios.put(url, data, options)
}

export const apiGet = (path:string) => {
    const url = getApiUrl(path)
    const options = {
        headers: getHeaders()
    }
    return axios.get(url, options)
}

export const apiDelete = (path:string) => {
    const url = getApiUrl(path)
    const options = {
        headers: getHeaders()
    }
    return axios.delete(url, options)
}

/*export const apiRefreshToken = () => {
    const url = getApiUrl('/auth/refresh')
    const refreshToken = getRefreshToken()
    const options = {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    }
    return axios.post(url, {}, options)
}*/