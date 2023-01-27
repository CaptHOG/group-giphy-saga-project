import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Favorites from '../Favorites';
import Search from '../Search';
import './App.css';



function App(props) {

const getFavorite = () => {

  const dispatch = useDispatch();
    //const variable-that-takes-form-of-the-store = useSelector((store)=>store.reducerName) 
    //look for Connor get message
    dispatch({
      type:'SAGA_FETCH_GIFS'
  })
 }

  return (

    <Router>
      <div className="App">
        <header className="header">
          <h1 className="headerTitle">Giphy Search!</h1>
        </header>

        <Route exact path="/">
          <Search />
        </Route>

        <Route exact path="/favorites">
          <Favorites />
        </Route>
        
      </div>
    </Router>
  );
}

export default App;
