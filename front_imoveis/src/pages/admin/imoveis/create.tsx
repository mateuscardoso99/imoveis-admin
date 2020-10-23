import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from 'react-router-dom'

import Layout from '../../../components/admin/layout/layout'
import {apiGet} from '../../../services/api'
import Menu from '../../../components/admin/burger'
import {useDispatch,useSelector} from 'react-redux'
import {AplicationState} from '../../../store'

import { corretorGet } from '../../../actions/CorretorActions'
import { imovelCreate } from '../../../actions/ImovelActions'

interface Categoria{
    id: number
    descricao: string
}

const CreateImovel = () => {
    const history = useHistory()

    const {corretores} = useSelector((state: AplicationState)=>state.corretores)
    const dispatch = useDispatch()

    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0])

    //const [corretor, setCorretor] = useState<Corretores[]>([])
    const [selectedCorretor, setSelectedCorretor] = useState('0')

    const [categoria, setCategoria] = useState<Categoria[]>([])
    const [selectedCategoria, setSelectedCategoria] = useState('0')

    const [file,setFile] = useState<FileList>()
    const [formData, setFormData] = useState({
        descricao: '',
        valor: '',
        endereco: '',
        detalhes: '',
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setInitialPosition([latitude, longitude])
        })
    }, [])

    useEffect(() => {
        dispatch(corretorGet())
        apiGet('/categorias').then(resposta => {
            setCategoria(resposta.data)
        })
    }, [])

    function mapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function corretorSelecionado(event: ChangeEvent<HTMLSelectElement>){
        const corretor = event.target.value
        setSelectedCorretor(corretor)
    }

    function categoriaSelecionado(event: ChangeEvent<HTMLSelectElement>){
        const categoria = event.target.value
        setSelectedCategoria(categoria)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>){
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleInputFileChange(event: FileList){
        setFile(event)
    }

    async function cadastrarImovel(event: FormEvent){
        event.preventDefault()

        const { descricao, valor, endereco, detalhes } = formData
        const [latitude, longitude] = selectedPosition
        const uf = "RS"
        const cidade = "Santa Maria"
        const categoria = selectedCategoria
        const corretor = selectedCorretor
  
        const dados = new FormData()
            dados.append('descricao', descricao)
            dados.append('endereco', endereco)
            dados.append('detalhes', detalhes)
            dados.append('latitude', String(latitude))
            dados.append('longitude', String(longitude))
            dados.append('cidade', cidade)
            dados.append('uf', uf)
            dados.append('valor', valor)
            dados.append('id_categoria', categoria)
            dados.append('id_corretor', corretor)

            if(file){ 
                for (let i = 0; i < file.length; i++) {
                    console.log('name',file[i].name)
                    console.log('i',file[i])
                    dados.append('imageImovel', file[i])
                }  
            }

        try{
        const resp = await dispatch(imovelCreate(dados))
            if(resp.payload.status === 201){
                voltar()
            }
            else{
                alert('Não foi posível cadastrar')
            }
        }catch(error){
            console.log(error)
            alert('Não foi posível cadastrar')
        }
    }

    function voltar(){
        history.push('/imoveis')
    }

    return(
        <Menu>
            <button className="back btn btn-primary" onClick={voltar}>←</button>
            <h1 className="text-center mb-3 bg-light text-dark">Novo imóvel</h1>
            <form onSubmit={cadastrarImovel} className="container justify-content-center" encType="multipart/form-data">
                    <div className="form-group col-12">
                        <label htmlFor="inputEmail4">Descricao</label>
                        <input type="text" className="form-control" id="descricao" name="descricao" onChange={handleInputChange}/>
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="inputPassword4">Valor R$</label>
                        <input type="number" step="0.01" className="form-control" id="valor" name="valor" onChange={handleInputChange}/>
                    </div>

                <div className="form-row">
                    <div className="form-group col-12">
                        <label htmlFor="imageImovel">Selecione as fotos do imóvel:</label>
                        <input type="file" multiple className="file ml-3" id="imageImovel" name="imageImovel" onChange={(e)=>handleInputFileChange(e.target.files as FileList)}/>
                    </div>
                </div>

                <Map center={initialPosition} zoom={13} onclick={mapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={selectedPosition}/>
                </Map>

                <div className="form-group col-12">
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" className="form-control" id="endereco" name="endereco" onChange={handleInputChange}/>
                </div>
 
                <div className="form-group col-12">
                    <label htmlFor="select_estado">Estado</label>
                    <select id="select_estado" value="RS" className="form-control">
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="select_cidade">Cidade</label>
                    <select id="select_cidade" value="Santa Maria" className="form-control">
                        <option value="0" selected>Santa Maria</option>
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="select_corretor">Corretor responsável</label>
                    <select id="select_corretor" name="select_corretor" value={selectedCorretor} className="form-control" onChange={corretorSelecionado}>
                        <option value="0">Selecione</option>
                        {corretores.map(c => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="select_corretor">Categoria</label>
                    <select id="select_categoria" name="select_categoria" value={selectedCategoria} className="form-control" onChange={categoriaSelecionado}>
                        <option value="0">Selecione</option>
                        {categoria.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="detalhes">Detalhes</label>
                    <textarea className="form-control" rows={5} id="detalhes" name="detalhes" onChange={handleTextAreaChange}></textarea>
                </div>
                <div className="form-row col-md-12 justify-content-center">
                    <button type="submit" className="btn btn-primary ml-5 mr-5">Cadastrar</button>
                </div>
            </form>
        </Menu>
    )
}

export default CreateImovel