import React, {useState, FormEvent, ChangeEvent} from 'react'
import Layout from '../../../components/admin/layout/layout'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { corretorCreate } from '../../../actions/CorretorActions'

const CreateCorretor = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
    })
    const [file,setFile] = useState<File>()

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleInputFileChange(event: ChangeEvent<HTMLInputElement>){
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        setFile(file)
        //console.log(file)
    }

    async function cadastrarCorretor(event: FormEvent){
        event.preventDefault()

        let dados
        
        if(file){
            dados = new FormData()
            const { nome, email } = formData
            dados.append('nome',nome)
            dados.append('email',email)
            dados.append('imageCorretor',file)
        }
        else{
            const { nome, email } = formData
            dados = {
                "nome": nome,
                "email": email
            }
        }

        try {
            const resp = await dispatch(corretorCreate(dados))
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
        history.push('/corretores')
    }

    return(
        <Layout title="Novo corretor" back="/corretores">
            <form onSubmit={cadastrarCorretor}>
                <div>
                    <label htmlFor="imageImovel">Selecione uma foto:</label>
                    <input type="file" className="file ml-3" id="imageCorretor" name="imageCorretor" onChange={handleInputFileChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" onChange={handleInputChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </Layout>
    )
}
export default CreateCorretor