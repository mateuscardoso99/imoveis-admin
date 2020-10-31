import React, {useState,useEffect,FormEvent,ChangeEvent} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import Layout from '../../../components/admin/layout/layout'
import Menu from '../../../components/admin/layout/burger'
import {useDispatch,useSelector} from 'react-redux'
import {AplicationState} from '../../../store'

import {userGetSingle, userUpdate} from '../../../actions/UserActions'

const UserUpdate = () => {
    const history = useHistory()
    const {id} = useParams()

    const dispatch = useDispatch()

    const [formData,setFormData] = useState({
        login: '',
        password: ''
    })

    useEffect(() => {
        const getUser = async () =>{
            const resp = await dispatch(userGetSingle(id))
            setFormData({login: resp.payload.data[0].usuario, password: ''})
        }
        getUser()
    }, [id, userGetSingle])
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    async function UpdateUsuario(event: FormEvent){
        event.preventDefault()
        const data = formData
        console.log(data)
        try {
            const resp = await dispatch(userUpdate(id, data))
            if(resp.payload.status === 204){
                voltar()
            }
            else{
                alert('Não foi posível atualizar')
            }
        } catch (error) {
            console.log(error)
            alert('Não foi posível atualizar')
        }
    }

    function voltar(){
        history.push('/usuarios')
    }

    return(
        <Menu>
            <button className="back btn btn-primary" onClick={voltar}>←</button>
            <div className="container">
            <form onSubmit={UpdateUsuario}>
                <div className="input-field">
                    <label htmlFor="username">Nome</label>
                    <input type="text" className="form-control" id="login" name="login" value={formData.login} onChange={handleInputChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="userpassword">Nova senha</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </div>
            </form>
            </div>
        </Menu>
    )
}

export default UserUpdate