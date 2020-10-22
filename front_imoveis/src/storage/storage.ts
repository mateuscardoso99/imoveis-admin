import Cookies from 'universal-cookie'

const cookie = new Cookies()

const defaultOptions = {
    path: '/'
}

export const getCookie = (name: any, options={}) => {
    if(!name) return null
    return cookie.get(name, {...options})
}

export const setCookie = (name: any, value: any, options={}) => {
    if(!name || value === undefined) return null
    cookie.set(name, value, {...defaultOptions, ...options})
    return true
}

export const removeCookie = (name: any, options: any) => {
    if(!name) return null
    cookie.remove(name, {...defaultOptions, ...options})
}