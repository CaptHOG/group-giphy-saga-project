import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put }from 'redux-saga/effects'
import axios from 'axios';


function* sendSearch (action) {
    // 3. send search takes the dispatch from 'SAGA_FETCH_SEARCH', and supplying the function with the search term.
    try{
        // 4. assigns the term to the searchQuery variable.
        const searchQuery = action.payload;
        // 5. set params with the variable of searchQuery as an object.
        const response = yield  axios({
            method:  'GET',
            url: '/api/favorite/search',
            params: {searchQuery}
        })
        // Send GIF data to results reducer
     yield put ({
        // 9. this sets the state of the reducer with the corresponding type.
        type: 'SET_SEARCH',
        payload: response
        })
    }catch (error){
        console.log(`sendSearch broke POST saga index`, error);
    }
}

function* fetchGifs () {
    try{
        const response = yield  axios({
            method:  'GET',
            url: '/api/favorite'
        })
     yield put ({
        type: 'SET_STATE',
        payload: response.data
        })
    }catch (error){
        console.log(`fetch gif broke GET saga index`, error);
    }
}



const favorites = (state = [], action) => {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload;
        default:
            return state;
    }
}

// 10. this is the reducer that was set from the above sendSearch function.
const results = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            console.log("this is the:", action.payload.data);
            return action.payload.data;
        default:
            return state;
    }
} 

// Creates generator 
function* rootSaga(){
    yield  takeEvery('SAGA_FETCH_GIFS', fetchGifs)
    // 2. sendSearch listens for 'SAGA_FETCH_SEARCH' and then sendSearch gets called
    yield  takeEvery('SAGA_FETCH_SEARCH', sendSearch)
}
// middleware for saga
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
    combineReducers({
        favorites,
        results
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);


sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
