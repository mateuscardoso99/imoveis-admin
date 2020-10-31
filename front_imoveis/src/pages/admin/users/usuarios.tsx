import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../../components/admin/layout/layout'
import LoaderButton from '../../../components/admin/loaderButton/loader'
import Menu from '../../../components/admin/layout/burger'
import {useSelector, useDispatch} from 'react-redux'

import {AplicationState} from '../../../store'

import {userGet,userDelete} from '../../../actions/UserActions'

const Users = () => {
    const users = useSelector((state: AplicationState) => state.users.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userGet())
    }, [userGet])

    async function apagar(id: number){
        if(window.confirm('Deseja apagar este usuário?')){
            try{
                const resp = await dispatch(userDelete(id))
                if(resp.payload === 'user limit error'){
                    alert('É preciso ter no mínimo 1 usuário cadastrado!')
                }
            }catch(error){
                console.log(error)
            }
        }
    }

    if(!users){
        return null
    }
    
        return(
            <Menu>
                {users.length === 0 && (<LoaderButton/>)}
                <Link to="/usuarios/create" className="add btn btn-primary">+</Link>
                <h1 className="text-center mb-3 bg-light text-dark">Usuários</h1>
                <div className="container-fluid">
                <table className="table table-sm table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Usuário</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.usuario}</td>
                                    <td>
                                        <Link to={`/usuarios/update/${user.id}`} className="btn btn-success mt-1 mr-1">Atualizar</Link>
                                        <button className="btn btn-danger mt-1 ml-1" onClick={(e) => {e.preventDefault(); apagar(user.id)}}>Apagar</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </Menu>
        )
}

export default Users