import React from 'react';
import {useDispatch,useSelector} from 'react-redux'


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
    <div>
      <h1>Giphy Search!</h1>
      
    </div>
  );
}

export default App;
