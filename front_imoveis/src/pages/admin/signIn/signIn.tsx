import React, {useState,FormEvent,ChangeEvent} from 'react'
import {Redirect} from 'react-router-dom'
import {apiPost} from '../../../services/api'

import '../../../css/login.css'
import ImageBackground from '../../../assets/bg-01.jpg'

import {useSelector,useDispatch} from 'react-redux'
import {AplicationState} from '../../../store'
import {signIn} from '../../../actions/AccountActions'

const SignIn = () => {

    const account = useSelector((state: AplicationState)=>state.account.account)
    const dispatch = useDispatch()
  
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    })
    
    if (account) {
        return <Redirect to='/imoveis'/>
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    async function login (e: FormEvent){
        e.preventDefault()
        const {login,password} = formData

        const data = {
            "login": login,
            "password": password,
        }
        dispatch(signIn(data))
    }

    return(
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title" style={{backgroundImage: `url(${ImageBackground})`}}>
                            <span className="login100-form-title-1">Sign In</span>
                        </div>

                        <form onSubmit={login} className="login100-form validate-form">
                            <div className="wrap-input100 validate-input mb-3" data-validate="Username is required">
                                <span className="label-input100">Username</span>
                                <input className="input100" type="text" id="login" name="login" placeholder="Enter username" onChange={handleInputChange} required/>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input mb-3" data-validate = "Password is required">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" id="password" name="password" placeholder="Enter password" onChange={handleInputChange} required/>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default SignIn