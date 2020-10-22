import React,{useState,ChangeEvent,FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import Layout from '../../../components/admin/layout/layout'
import Menu from '../../../components/admin/burger'
import {useDispatch} from 'react-redux'
import {userCreate} from '../../../actions/UserActions'

const CreateUser = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    })

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    async function cadastrarUsuario(event: FormEvent){
        event.preventDefault()
        const dados = formData
        try {
            const resp = await dispatch(userCreate(dados))
            if(resp.payload.status === 201){
                voltar()
            }
            else{
                alert('Não foi posível cadastrar')
            }
        } catch (error) {
            console.log(error)
            alert('Não foi posível cadastrar')
        }
    }

    function voltar(){
        history.push('/usuarios')
    }

    return(
        <Menu>
            <button className="back btn btn-primary" onClick={voltar}>←</button>
            <h1 className="text-center mb-3 bg-light text-dark">Novo usuário</h1>
            <form onSubmit={cadastrarUsuario} className="container justify-content-center">
                    <div className="form-group col-10">
                        <label htmlFor="username">Nome</label>
                        <input type="text" className="form-control" id="login" name="login" onChange={handleInputChange}/>
                    </div>
                    <div className="form-group col-10">
                        <label htmlFor="userpassword">Senha</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange}/>
                    </div>
                <div className="form-row col-10 justify-content-center">
                    <button type="submit" className="btn btn-primary">Criar Usuário</button>
                </div>
            </form>
        </Menu>
    )
}

export default CreateUser