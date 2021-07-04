import React, { useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import Layout from '../../../components/admin/layout/layout'
import LoaderButton from '../../../components/admin/loaderButton/loader'
import {useSelector,useDispatch} from 'react-redux'
import {AplicationState} from '../../../store'
import {imovelGetSingle,imovelDelete} from '../../../actions/ImovelActions'
import { Map, TileLayer, Marker } from 'react-leaflet'

import {Carousel} from 'react-responsive-carousel'

import Slider from 'react-slick'

const DetailImovel = () => {

    const history = useHistory()
    const {id}:any = useParams()

    const {imovel} = useSelector((state: AplicationState)=>state.imoveis)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(imovelGetSingle(id))
    },[])

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

    function voltar(){
        history.push('/imoveis')
    }

        return(
            <Layout title="Detalhes" back="/imoveis">
                {!imovel && (<LoaderButton/>)}
                <div className="container">
                    <Carousel showThumbs={false} infiniteLoop={true}>
                        {imovel.imagens && imovel.imagens.map(image=>(
                            <div key={image}>
                                <img src={image}/>
                            </div>
                        ))}
                    </Carousel>
                
                    <Map center={[imovel.latitude,imovel.longitude]} zoom={20}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[imovel.latitude,imovel.longitude]}/>
                    </Map>

                    <div className="jumbotron">
                        <h1 className="display-4">{imovel.descricao}</h1>
                        <h2 className="lead">{imovel.endereco}</h2>
                        <hr className="my-4"></hr>
                        <h3>{imovel.detalhes}</h3>
                        <h3>{imovel.valor}</h3>
                        <h4>{imovel.cidade} - {imovel.uf}</h4>
                        <p className="lead">
                        <Link to={`/imoveis/update/${imovel.id}`} className="btn btn-success mr-2 ml-2">Atualizar</Link>
                            <button className="btn btn-danger ml-2" onClick={(e) => {e.preventDefault(); apagar(imovel.id)}}>Apagar</button>
                        </p>
                    </div>
                </div>
            </Layout>
        )
}

export default DetailImovel