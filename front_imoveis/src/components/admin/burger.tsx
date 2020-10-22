import React,{ReactNode} from 'react'
import {Link} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import './style.css'
import '../../css/styles.css'

interface Children{
    children: ReactNode
}

const MenuBurger = ({children}: Children) =>{
    return(
        <div>
            <Menu isOpen={false}>
                <Link to="/imoveis" className="active">Imóveis</Link>
                <Link to="/corretores">Corretores</Link>
                <Link to="/agendamentos">Agendamentos</Link>
                <Link to="/usuarios">Usuários</Link>
            </Menu>
            <div className="conteudo">{children}</div>
        </div>
    )
}

export default MenuBurger