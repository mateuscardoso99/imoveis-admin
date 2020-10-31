import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import LoaderButton from '../../../components/admin/loaderButton/loader'
import Layout from '../../../components/admin/layout/layout'
import Menu from '../../../components/admin/layout/burger'
import {useSelector,useDispatch} from 'react-redux'
import {AplicationState} from '../../../store'
import {corretorGet,corretorDelete} from '../../../actions/CorretorActions'

const Corretores = () => {

    const {corretores} = useSelector((state: AplicationState)=>state.corretores)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(corretorGet())
    }, [corretorGet])
    
    async function apagar(id: number){
        if(window.confirm('Deseja apagar este corretor?')){
            try{
                const resp = await dispatch(corretorDelete(id))
                if(resp.payload === 'error delete corretor'){
                    alert('Não foi possível remover, desvincule este corretor dos imóveis e tente novamente')
                }
            }catch(error){
                console.log(error)
            }
        }
    }

    if(!corretores){
        return null
    }

    return(
        <Menu>
            {corretores.length === 0 && (<LoaderButton/>)}
            <h1 className="text-center mb-3 bg-light text-dark">Corretores</h1>
            <Link to="/corretores/create" className="add btn btn-primary">+</Link>
            <ul className="list-group">
                {corretores.map(corretor => (
                <li key={corretor.id} className="list-group-item">
                    <div className="card mt-5 ml-auto mr-auto mb-5" style={{width: "70%"}}>
                        <img src={corretor.imagem ? corretor.imagem : ''} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{corretor.nome}</h5>
                            <p className="card-text">{corretor.email}</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/corretores/update/${corretor.id}`} className="btn btn-success mr-2 ml-2">Atualizar</Link>
                            <button className="btn btn-danger ml-2" onClick={(e) => {e.preventDefault(); apagar(corretor.id)}}>Apagar</button>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </Menu>    
    )
}

export default Corretores