import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Imoveis from './pages/admin/imoveis'
import DetailImovel from './pages/admin/imoveis/detail'
import UpdateImovel from './pages/admin/imoveis/update'
import CreateImovel from './pages/admin/imoveis/create'

import Corretores from './pages/admin/corretores'
import CreateCorretor from './pages/admin/corretores/create'
import UpdateCorretor from './pages/admin/corretores/update'

import Users from './pages/admin/users'
import CreateUser from './pages/admin/users/create'
import UserUpdate from './pages/admin/users/update'

import Agendamentos from './pages/admin/agendamentos'

import SignIn from './pages/admin/signIn/signIn'

import RedirectTo from './components/admin/redirect/redirect'

const Routes = () => {

     /* passando dados pela rota:
         component={() => <Corretores dados={`Props through component`} />}/>
         dentro do componente corretores:
         const Corretores = ({dados}: {dados: string}) => {}
      */
      /* jeito melhor:
         component={(props:string) => <Corretores {...props} dados={33} />}
      */

    return(
        <BrowserRouter>
            <Switch>
              <Route path='/' component={RedirectTo} exact/>

              <Route path='/imoveis' component={Imoveis} exact/>
              <Route path='/imoveis/detail/:id' component={DetailImovel}/>
              <Route path='/imoveis/update/:id' component={UpdateImovel}/>
              <Route path='/imoveis/create' component={CreateImovel}/>
    
              <Route path='/corretores' component={Corretores} exact/>
              <Route path='/corretores/update/:id' component={UpdateCorretor}/>
              <Route path='/corretores/create' component={CreateCorretor}/>
    
              <Route path='/usuarios' component={Users} exact/>
              <Route path='/usuarios/update/:id' component={UserUpdate}/>
              <Route path='/usuarios/create' component={CreateUser}/>

              <Route path='/agendamentos' component={Agendamentos}/>

              <Route path='/sign-in' component={SignIn}/>
            </Switch>
        </BrowserRouter>
      );
}

export default Routes