import {setCookie, getCookie, removeCookie} from './storage'

const expires = new Date()
expires.setFullYear(expires.getFullYear() + 1)

const options = {expires}

export const COOKIE_ACCOUNT = 'acc'
export const COOKIE_TOKEN = 'tk'
export const COOKIE_REFRESH_TOKEN = 'rtk'

export const setAccount = (account: any) => setCookie(COOKIE_ACCOUNT, account, options)
export const getAccount = () => getCookie(COOKIE_ACCOUNT)
export const removeAccount = () => removeCookie(COOKIE_ACCOUNT, options)

export const setToken = (token: any) => setCookie(COOKIE_TOKEN, token, options)
export const getToken = () => getCookie(COOKIE_TOKEN)
export const removeToken = () => removeCookie(COOKIE_TOKEN, options)

export const setRefreshToken = (refreshToken: any) => setCookie(COOKIE_REFRESH_TOKEN, refreshToken, options)
export const getRefreshToken = () => getCookie(COOKIE_REFRESH_TOKEN)
export const removeRefreshToken = () => removeCookie(COOKIE_REFRESH_TOKEN, options)