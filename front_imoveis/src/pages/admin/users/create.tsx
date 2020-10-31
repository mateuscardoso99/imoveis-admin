import React,{useState,ChangeEvent,FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import Layout from '../../../components/admin/layout/layout'
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
        <Layout title="Novo usuário" back="/usuarios">
            <form onSubmit={cadastrarUsuario}>
                <div className="input-field">
                    <label htmlFor="username">Nome</label>
                    <input type="text" className="form-control" id="login" name="login" onChange={handleInputChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="userpassword">Senha</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Criar Usuário</button>
                </div>
            </form>
        </Layout>
    )
}

export default CreateUser