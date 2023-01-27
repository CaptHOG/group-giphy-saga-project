import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(store => store.favorites);
  
  

  console.log(results);


  useEffect(() => {
    getGifs();
    // searchGifs();
  }, []);

  const getGifs = () => {
    dispatch({
        type: 'SAGA_FETCH_GIFS',     
    })
  }

  // const searchGifs = () => {
  //   dispatch({
  //       type: 'SAGA_FETCH_SEARCH',     
  //   })
  // }


  
  return (
    <>
      <h1>Favorites</h1>
      <div>
        {favorites.map((image) => {
            return <img key={image.id} src={image.url}></img>
        })}
      </div>
      
    </>
  )
}


export default Favorites;