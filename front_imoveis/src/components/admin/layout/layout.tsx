import React, { ReactNode } from 'react'
import {Link} from 'react-router-dom'

import '../../../css/styles.css'

interface Children{
    children: ReactNode
}
const Layout = ({children}: Children) => {
    return (
        <div>
            <div className="sidebar border-right">
                <Link to="/imoveis" className="active">Imoveis</Link>
                <Link to="/corretores">Corretores</Link>
                <Link to="/agendamentos">Agendamentos</Link>
                <Link to="/usuarios">Usuários</Link>
            </div>
            <div className="conteudo">{children}</div>
        </div>
      );
}

export default Layout