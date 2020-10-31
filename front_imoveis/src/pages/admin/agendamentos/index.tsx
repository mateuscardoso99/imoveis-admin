import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../../components/admin/layout/layout'
import LoaderButton from '../../../components/admin/loaderButton/loader'
import {apiGet, apiDelete, apiPut} from '../../../services/api'

interface Agendamentos{
    id: number
    mensagem: string
    situacao: string
    id_imovel: number
    id_corretor: number
    nomeCorretor: string
}

const Agendamentos = () => {

    const [agendamentos, setAgendamentos] = useState<Agendamentos[]>([])

    useEffect(() => {
        buscar()
    }, [])

    function buscar(){
        apiGet('/agendamentos').then(resposta => {
            setAgendamentos(resposta.data)
        })
    }
    
    async function apagar(id: number){
        if(window.confirm('Deseja apagar este agendamento?')){
            await apiDelete(`/agendamentos/${id}`)
            buscar()
        }
    }

    async function update(id: number){
        if(window.confirm('Deseja concluir este agendamento?')){
            const dados = {situacao:'concluído'}
            await apiPut(`/agendamentos/${id}`,dados)
            buscar()
        }
    }


    return(
        <Layout title="Agendamentos">
            {agendamentos.length === 0 && (<LoaderButton/>)}
            <div className="container-fluid">
            <table className="table table-sm table-responsive-sm table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mensagem</th>
                        <th scope="col">Situacao</th>
                        <th scope="col">Código Imovel</th>
                        <th scope="col">Corretor</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map(agendamento => (
                        <tr key={agendamento.id}>
                            <td>{agendamento.mensagem}</td>
                            <td>{agendamento.situacao}</td>
                            <td><Link to={`/imoveis/detail/${agendamento.id_imovel}`}>{agendamento.id_imovel}</Link></td>
                            <td>{agendamento.nomeCorretor}</td>
                            <td>
                                <button className="btn btn-success mt-1 mr-1" onClick={(e) => {e.preventDefault(); update(agendamento.id)}}>Atualizar</button>
                                <button className="btn btn-danger mt-1 ml-1" onClick={(e) => {e.preventDefault(); apagar(agendamento.id)}}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </Layout>
    )
}

export default Agendamentos