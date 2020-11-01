import React,{ReactNode} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import './layout.css'
import '../../../css/styles.css'

import { FaArrowLeft, FaPlus } from 'react-icons/fa'

interface Props{
    children: ReactNode
    title: string
    to?: string
    back?: string
}

const MenuBurger = ({children, title, to, back}: Props) =>{
    const history = useHistory()

    const voltar = () => {
        back && history.push(back)
    }

    const next = () => {
        to && history.push(to)
    }

    return(
        <div>
            <div className="top-menu">
                <Menu isOpen={false}>
                    <Link to="/imoveis" className="active">Imóveis</Link>
                    <Link to="/corretores">Corretores</Link>
                    <Link to="/agendamentos">Agendamentos</Link>
                    <Link to="/usuarios">Usuários</Link>
                    <a href="#">Sair</a>
                </Menu>
                <div className="title">
                    <h2>{title}</h2>
                </div>
                {back ? 
                    <div>
                        <button className="back" onClick={voltar}>
                            <FaArrowLeft/>
                        </button>
                    </div>
                : <div/>}
            </div>

            <div className="conteudo">
                {children}
                {to &&
                <Link to={to} className="add btn btn-primary">
                    <FaPlus/>
                </Link>
                }
            </div>
        </div>
    )
}

export default MenuBurger