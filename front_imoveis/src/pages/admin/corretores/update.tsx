import React, {useState,useEffect,ChangeEvent,FormEvent} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import Layout from '../../../components/admin/layout/layout'
import Menu from '../../../components/admin/burger'
import {useDispatch} from 'react-redux'

import {corretorUpdate, corretorGetSingle} from '../../../actions/CorretorActions'

const UpdateCorretor = () => {
    const {id} = useParams()
    const history = useHistory()

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
    })

    useEffect(() => {
        const getCorretor = async () =>{
            const resp = await dispatch(corretorGetSingle(id))
            setFormData({
                nome: resp.payload.data[0].nome,
                email: resp.payload.data[0].email
            })
        }
        getCorretor()
    }, [id, corretorGetSingle])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    async function atualizarCorretor(event: FormEvent){
        event.preventDefault()
        const data = formData
        try{
            const resp = await dispatch(corretorUpdate(id, data))
            if(resp.payload.status === 204){
                voltar()
            }
            else{
                alert('Não foi posível atualizar')
            }
        }catch(error){
            console.log(error)
            alert('Não foi posível atualizar')
        }
    }

    function voltar(){
        history.push('/corretores')
    }

    return(
        <Menu>
            <button className="back btn btn-primary" onClick={voltar}>←</button>
            <form onSubmit={atualizarCorretor} className="container justify-content-center">
                <div className="form-group col-10">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleInputChange}/>
                </div>
                <div className="form-group col-10">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
                </div>
                <div className="form-row col-10 justify-content-center">
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </div>
            </form>
        </Menu>
    )
}

export default UpdateCorretor