import React,{useEffect} from 'react';
import './App.css';

import {useDispatch} from 'react-redux'
import {initAccount} from './actions/AccountActions'

import Routes from './routes'

function App() {

    const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(initAccount())
	},[initAccount])

  	return (
    	<div className="App">
	        <Routes/>
	    </div>
  );
}

export default App;
