import React,{ReactNode} from 'react'
import {Link} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import './style.css'
import '../../../css/styles.css'

interface Props{
    children: ReactNode
    title?: string
    to?: string
}

const MenuBurger = ({children, title, to}: Props) =>{
    return(
        <div >
            <div className="top-menu">
                <Menu isOpen={false}>
                    <Link to="/imoveis" className="active">Imóveis</Link>
                    <Link to="/corretores">Corretores</Link>
                    <Link to="/agendamentos">Agendamentos</Link>
                    <Link to="/usuarios">Usuários</Link>
                </Menu>
                <div>
                    {title}
                </div>
                <div>
                    <button className="back btn btn-primary">←</button>
                </div>
            </div>
            <div className="conteudo">{children}</div>
        </div>
    )
}

export default MenuBurger