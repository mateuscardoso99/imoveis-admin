import React, { useEffect,useMemo } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../../../components/admin/layout/layout'
import LoaderButton from '../../../components/admin/loaderButton/loader'

import {useDispatch,useSelector} from 'react-redux'
import {AplicationState} from '../../../store'

import {imovelGet,imovelDelete} from '../../../actions/ImovelActions'

const Imoveis = () => {

    const {imoveis} = useSelector((state: AplicationState)=>state.imoveis)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(imovelGet())
    }, [imovelGet])

    const totalImoveis = useMemo(()=>imoveis.length,[imoveis])

    async function apagar(id: number){
        if(window.confirm('Deseja apagar este imóvel?')){
            try{
                const resp = await dispatch(imovelDelete(id))
                if(resp.payload === 'error delete imovel'){
                    alert('Não foi possível remover, desvincule este imóvel dos agendamentos e tente novamente')
                }
            }catch(error){
                console.log(error)
            }
        }
    }

    if(!imoveis){
        return null
    }

    return(
        <Layout title="Imóveis" to="/imoveis/create">
            {imoveis.map(imovel => (
                <div key={imovel.id} className="card mt-5 ml-auto mr-auto border-dark mb-3" style={{width: "70%"}}>
                    <img src={imovel.imagens ? imovel.imagens[Number(0)] : ''} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h3 className="card-title">{imovel.descricao}</h3>
                        <h5 className="card-text">{imovel.endereco}</h5>
                    </div>

                    <div className="card-footer">
                        <Link to={`/imoveis/detail/${imovel.id}`} className="btn btn-primary mr-2">Detalhes</Link>
                        <Link to={`/imoveis/update/${imovel.id}`} className="btn btn-success mr-2 ml-2">Atualizar</Link>
                        <button className="btn btn-danger ml-2" onClick={(e) => {e.preventDefault(); apagar(imovel.id)}}>Apagar</button>
                    </div>
                </div>
            ))}
            <div className="total-imoveis">
                <p>{totalImoveis} Imóveis cadastrados</p>
            </div>
        </Layout>
    )
}

export default Imoveis