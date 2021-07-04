import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import LoaderButton from '../../../components/admin/loaderButton/loader'
import Layout from '../../../components/admin/layout/layout'
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
        <Layout title="Corretores" to="/corretores/create">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Foto</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Opções</th>
                </tr>
              </thead>
              <tbody>
                {corretores.map(corretor => (
                    <tr key={corretor.id}>
                        <td>
                            <img 
                                src={corretor.imagem ? corretor.imagem : ''} 
                                className="img-fluid" 
                                alt={corretor.nome}/>
                        </td>
                        <td>{corretor.nome}</td>
                        <td>{corretor.email}</td>
                        <td>
                            <Link 
                                to={`/corretores/update/${corretor.id}`} 
                                className="btn btn-success mr-2 ml-2"
                            >
                                Atualizar
                            </Link>
                            <button 
                                className="btn btn-danger ml-2" 
                                onClick={(e) => {e.preventDefault(); apagar(corretor.id)}}
                            >
                                Apagar
                            </button>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
        </Layout>    
    )
}

export default Corretores